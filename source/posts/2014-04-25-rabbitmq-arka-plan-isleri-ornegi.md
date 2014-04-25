---
title: RabbitMQ 1 - Arka Plan İşleri Örneği
date: 2014-04-25
author: onurozgurozkan
tags: rabbitmq, amqp, bunny, ruby, arkaplan işleri, tr
---

Bir önceki makalemizde 'RabbitMQ ile Merhaba Dünya Örneğini' yapmıştık. Bu örneğimizde ise özellikle [Resque](https://github.com/resque/resque), [Delayed Job](https://github.com/collectiveidea/delayed_job/tree/master) gibi arka plan işler için RabbitMQ kullanacağız. 

![Örnek 2](articles/2013-04-25-rabbitmq.png)

Bir önceki örnekte `Producer`, `Consumer`'ye 'Merhaba Dünya' yazısı gönderiyordu. Gerçek hayatta bu işlem arka plan işlemlere iyi bir örnek değildir. Arkaplan işleri daha çok süre gerektiren ve işlerin bir tek instance tarafından değilde bir den çok instance tarafından yapıldığı işlemlerdir. Yedek alma, rapor çıkarmak, resim düzenleme gibi işlemler bunlara örnektir. Bu işlemlerin ortak özelliği yapılmalarının vakit almasıdır. 

## Hazırlık

O zaman bu örneğimizde `Producer` mesajı gönderirken onun ne kadar süreceğinide textin içinde göndersin ki gerçek bir arkaplan işini simüle edelim. Örneğin `Hello ...` işleminin bitmesi 3 saniye sürerken `Hello .....` 5 saniye sürsün.

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

Scriptlerimizi çalıştırabiliriz. Unutmayın scriptleri ayrı ayrı tablarda çalıştırmalısınız.

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

## Mesajların kabul edilmesi

## Mesajların devamlılığı

## Mesajların adil dağıtılması

## Hepsi bir arada

Saygılar.

### Kaynaklar

* [https://www.rabbitmq.com/tutorials/tutorial-one-ruby.html](https://www.rabbitmq.com/tutorials/tutorial-one-ruby.html)
