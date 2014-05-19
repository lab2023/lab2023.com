---
title: RabbitMQ 1 - RabbitMQ ile Merhaba Dünya Örneği
date: 2014-04-21
author: onurozgurozkan
tags: rabbitmq, amqp, bunny, ruby, tr
---

Bir önceki makalemizde aşağıdaki konulardan bahsettik;

* RabbitMQ nedir?
* Özellikleri nedir?
* Kimler kullanmalıdır?
* Kurulumu nasıl yapılmalıdır?

Şimdi basit bir 'Merhaba Dünya' uygulaması ile RabbitMQ'da ilk mesajımızı gönderecek ve alacağız. Aşağıdaki grafik yapılacak işlemi gösterecektir.

![Örnek 1](articles/2013-04-20-rabbitmq-1.png)

**Mesajın gönderilmesi**

* RabbitMQ'ya bağlanmak için

```ruby
#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new(:automatically_recover => false)
conn.start
```

* Yeni bir kanal yaratmak için

```ruby
ch   = conn.create_channel
```

* Yaratılan kanaldan bir queue isimlendirip mesaj göndermek için

```ruby
q    = ch.queue("hello")
ch.default_exchange.publish("Hello World!", :routing_key => q.name)
puts " [x] Sent 'Hello World!'"
```

* Bağlantıyı kapatmak için

```ruby
conn.close
```

* Hepsini birleştirip `sender.rb` dosyasını oluşturalım.

```ruby
#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new(:automatically_recover => false)
conn.start

ch   = conn.create_channel

q    = ch.queue("hello")
ch.default_exchange.publish("Hello World!", :routing_key => q.name)
puts " [x] Sent 'Hello World!'"

conn.close
```

**Mesajın alınması**

* RabbitMQ'a bağlanmak, yeni bir kanal açmak ve kuyruğu tanımlamak için

```ruby
#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new(:automatically_recover => false)
conn.start

ch   = conn.create_channel
q    = ch.queue("hello")
```

* Mesajları dinlemek için `Bunny::Queue#subscribe` methodu kullanılır.

```ruby
begin
  puts " [*] Waiting for messages. To exit press CTRL+C"
  q.subscribe(:block => true) do |delivery_info, properties, body|
    puts " [x] Received #{body}"
  end
rescue Interrupt => _
  conn.close
  exit(0)
end
```

* Hepsini birleştirip `receiver.rb` dosyasını oluşturalım.

```ruby
#!/usr/bin/env ruby
# encoding: utf-8

require "bunny"

conn = Bunny.new(:automatically_recover => false)
conn.start

ch   = conn.create_channel
q    = ch.queue("hello")

begin
  puts " [*] Waiting for messages. To exit press CTRL+C"
  q.subscribe(:block => true) do |delivery_info, properties, body|
    puts " [x] Received #{body}"
  end
rescue Interrupt => _
  conn.close
  exit(0)
end
```

**Terminalden dosyaları çalıştıralım.**

Unutmayın ayrı ayrı sekmelerde çalıştıracaksınız!

```bash
$ ruby -rubygems send.rb
$ ruby -rubygems receive.rb
```

Sonuçları terminal çıktılarından görebileceğiniz gibi `http://localhost:15672/` adresinden veya terminalden `rabbitmqctl list_queues` kodu ile de görebilirsiniz.

Bundan sonraki makalemiz RabbitMQ ve iş kuyrukları üzerine olacaktır.

Saygılar.

### Kaynaklar

* [https://www.rabbitmq.com/tutorials/tutorial-one-ruby.html](https://www.rabbitmq.com/tutorials/tutorial-one-ruby.html)