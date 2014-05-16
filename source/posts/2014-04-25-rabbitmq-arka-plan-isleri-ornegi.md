---
title: RabbitMQ 2 - Arka Plan İşleri Örneği
date: 2014-04-25
author: onurozgurozkan
tags: rabbitmq, amqp, bunny, ruby, arkaplan işleri, tr
---

Bir önceki makalemizde ['RabbitMQ ile Merhaba Dünya Örneğini'](http://lab2023.com/rabbitmq-hello-world-ornegi.html)
yapmıştık. Bu örneğimizde ise özellikle [Resque](https://github.com/resque/resque), [Delayed Job](https://github.com/collectiveidea/delayed_job/tree/master)
gibi arka plan işler için RabbitMQ kullanacağız.

![Örnek 2](articles/2014-04-25-rabbitmq.png)

Bir önceki örnekte `Producer`, `Consumer`'ye 'Merhaba Dünya' yazısı gönderiyordu. Gerçek hayatta bu işlem arka plan
işlemlere iyi bir örnek değildir. Arkaplan işleri daha çok süre gerektiren ve işlerin bir tek instance tarafından
değil de birden çok instance tarafından yapıldığı işlemlerdir. Yedek alma, rapor çıkarmak, resim düzenleme gibi işlemler
bunlara örnektir. Bu işlemlerin ortak özelliği yapılmalarının vakit almasıdır.

## Hazırlık

O zaman bu örneğimizde `Producer` mesajı gönderirken onun ne kadar süreceğini de textin içinde göndersin ki gerçek bir
arkaplan işini simüle edelim. Örneğin `Hello ...` işleminin bitmesi 3 saniye sürerken `Hello .....` 5 saniye sürsün.
Her bir nokta bir saniye gibi düşünebiliriz.

Buna göre kodlarımızı düzenleyelim. `send.rb` artık yapılacak iş olduğundan `new_task.rb` demek daha doğru olur.

```ruby
msg  = ARGV.empty? ? "Hello World!" : ARGV.join(" ")

q.publish(msg, :persistent => true)
puts " [x] Published #{msg}"
```

`receive.rb` dosyamızda işi yapan kod olduğuna göre ona da `worker.rb` demek daha doğru olacaktır.

```ruby
q.subscribe(:ack => true, :block => true) do |delivery_info, properties, body|
  puts " [x] Received #{body}"
  # imitate some work
  sleep body.count(".").to_i
  puts " [x] Done"

  ch.ack(delivery_info.delivery_tag)
end
```

Scriptlerimizi çalıştırabiliriz. Unutmayın scriptleri ayrı ayrı terminal tablarda çalıştırmalısınız.

```bash
shell1$ ruby -rubygems worker.rb
shell2$ ruby -rubygems new_task.rb
```

## Sıra ile dağıtma

Worker Queue'nin en büyük avantajı yapılacak işlerin paralel yapılabilmesidir. Çok rahat bir şekilde yeni workerlar ekleyip uygulamanızı ölçeklendirebilirsiniz.

Aynı anda iki worker çalıştırırsanız aşağıdaki sonucu alacaksınız.

```bash
shell1$ ruby -rubygems worker.rb
[*] Waiting for messages. To exit press CTRL+C
```

```bash
shell2$ ruby -rubygems worker.rb
[*] Waiting for messages. To exit press CTRL+C
```

 Mesajlarımızı gönderelim

```bash
shell3$ ruby -rubygems new_task.rb First message.
shell3$ ruby -rubygems new_task.rb Second message..
shell3$ ruby -rubygems new_task.rb Third message...
shell3$ ruby -rubygems new_task.rb Fourth message....
shell3$ ruby -rubygems new_task.rb Fifth message.....
```

Shell1 ve Shell2 için çıktılar

```bash
shell1$ ruby -rubygems worker.rb
 [*] Waiting for messages. To exit press CTRL+C
 [x] Received 'First message.'
 [x] Received 'Third message...'
 [x] Received 'Fifth message.....'
```

```bash
shell2$ ruby -rubygems worker.rb
 [*] Waiting for messages. To exit press CTRL+C
 [x] Received 'Second message..'
 [x] Received 'Fourth message....'
```

Gördüğünüz gibi yapılacak işler shell1 ve shell2 arasında paylaşılmaktadir.

## Mesajların bildirilmesi

Peki `Consumers` bu uzun işlemleri yaparken bir hata ile karşılaşıp ölür ise ne olur? Şuanki kodumuza göre o işlem yapılmamış olur çünkü RabbitMQ mesajın gönderilmesi ile ilgili mesajı hafızadan siler. Bu durumda hem iş yapılmamış olur, hemde mesaj gönderildiği anda hafızadan silindiği için tekrar kuyruğa atma şansımız olmaz.

Mesajların kaybolmasını engellemek için RabbitMQ `acknowledgments` özelliğini sunar. Basitçe anlatmak gerekir ise `ack(nowledgement)` mesajın başırı ile alındaığını ve işlem gerçekleşince `consumer`'a bir mesaj ile bildirir. Bundan sonra RabbitMQ hafızadan mesajı siler.

Eğer `consumer` ack göndermeden ölür ise, RabbitMQ bu mesajın yerine ulaşmadığını veya işlemin başarı ile tamamlanmadığını anlar. Hafızasından silmediği mesajı başka bir `consumer`'a gönderir.

Mesajlar için bir timeout yoktur. RabbitMQ mesajları ancak worker connectionları ölür ise tekrar dağıtır.

Varsayılan olarak `ack` özelliği kapalı gelir. Aktifleştirmek için `:manuel_ack => true` parametresi `subscribe` methoduna eklenmelidir.

```ruby
q.subscribe(:manual_ack => true, :block => true) do |delivery_info, properties, body|
  puts " [x] Received '#{body}'"
  # imitate some work
  sleep 1.0
  puts " [x] Done"
  ch.ack(delivery_info.delivery_tag)
end
```

Ack özelliğini worker çalışırken workerı `CTRL+C` komutu ile öldürerek deneyebilirsiniz.

**Unutulan acknowledgementlar**

`ack`'ların unutulması çok sık yapılan bir hatadır ama etkileri ciddi olur. Istemciler çıktığında RabbitMQ mesajları otomatik olarak tekrar dağıtır. Geliştiriciler bu dağıtımların nedenlerini anlayamaz. Tabii bu dağıtımlar katlanarak RAM ve CPU kullanımının artmasına neden olur. Bu durumu debug etmek için `rabbitmqctl` komutunu kullanabilirsiniz.

```bash
$ sudo rabbitmqctl list_queues name messages_ready messages_unacknowledged
  Listing queues ...
  hello    0       0
  ...done.
```

## Mesajların devamlılığı

Peki workerlar değilde RabbitMQ'nun kendisi kapanırsa veya restart olursa mesajlarımız ne olur? Böyle bir senaryoda mevcut kodlar ile sadece mesajlar değil kuyraklarda kaybolur. Hiçbir kayıp yaşamak istemiyorsak hem kuyrukları hem mesajları korumamız gerekiyor.

Ilk önce RabbitMQ'nun kuyrukları kaybetmemesini sağlayalım. Bunun içın kuyruklara `:durable => true` parametresini geçiyoruz.

```ruby
ch.queue('hello', :durable => true)
```

Mevcut bir kanala `:durable => true` ifadesini geçtiğimiz zaman RabbitMQ size hata verecektir çünkü kanallara sonradan `durable` eklenemez. Bu problemi çözmenin en basit yolu kanalın ismini değiştirmektir.

```ruby
ch.queue('task_queue', :durable => true)
```

Diğer unutulmaması gereken konu `durable` parametresinin hem `consumer` hem de `producer`'a uyarlanması gerektiğidir. Bu eklemeden sonra RabbitMQ yeniden başlatılsa bile kuyruklar kaybolmayacaktır.

Mesajların sürekliliği içinde `:persistent => true` parametresini eklemeliyiz.

```ruby
x.publish(msg, :persistent => true)
```

**Mesajların sürekliliği**

Mesajlarınızı `persistent` yapmak mesajlarınızın kaybolmamasını yüzde yüz garanti altına almıyor. `persistent` işlemi mesajlarınızın diske yazılmasını sağlıyor. Bu kısa sürede çok küçükte olsa mesajlarınızın kaybolma riski vardır. Daha kesin bir çözüm için publish kodunuzu transaction bloku içine almanızdır.


## Mesajların adil dağıtılması

Bazen kuyruktaki mesajlar istediğiniz gibi dağılmaz. Bunu söyle bir durum ile özetleyelim. Örneğin tekil mesajlar basit iken, çoğul mesajlar zor olsun. Böyle bir durumda workerlardan biri sürekli çalışırken diğeri sürekli beklemede olacaktır.

Bunun nedeni basittir. RabbitMQ, kuyruktaki mesajları dağıtırken `consumer`ların unacknowledge mesaj sayısına bakmaz. RabbitMQ bu konuda kör gibi davranır. Gelen N mesajı N tane workera eşit sayıda dağıtır.

Bunu engellemenin yolu bir workerın elindeki iş bitmeden yeni bir iş atanmasını engellemek daha doğru bir ifade ile aynı anda kaç iş yapabileceğini `prefetch` methodu ile belirlemektir.

```ruby
n = 1
ch.prefetch(n)
```

Eğer workerlar çok yoğun ise yeni bir worker sisteme eklenebilir. Bunun ile ilgili bir strateji geliştirebilirsiniz.

## Hepsi bir arada

Son olarak bütün kodların son hallerini toplayalım.

new_task.rb

```ruby
#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new
conn.start

ch   = conn.create_channel
q    = ch.queue("task_queue", :durable => true)

msg  = ARGV.empty? ? "Hello World!" : ARGV.join(" ")

q.publish(msg, :persistent => true)
puts " [x] Sent #{msg}"

sleep 1.0
conn.close
```

worker.rb

```ruby
#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new
conn.start

ch   = conn.create_channel
q    = ch.queue("task_queue", :durable => true)

ch.prefetch(1)
puts " [*] Waiting for messages. To exit press CTRL+C"

begin
  q.subscribe(:ack => true, :block => true) do |delivery_info, properties, body|
    puts " [x] Received '#{body}'"
    # imitate some work
    sleep 1.0
    puts " [x] Done"
    ch.ack(delivery_info.delivery_tag)
  end
rescue Interrupt => _
  conn.close
end
```

Konu ile ilgili daha detaylı bilgi almak için [Bunny API Referanslarına](http://reference.rubybunny.info/) bakabilirsiniz.

Saygılar.

### Kaynaklar

* [https://www.rabbitmq.com/tutorials/tutorial-two-ruby.html](https://www.rabbitmq.com/tutorials/tutorial-two-ruby.html)
