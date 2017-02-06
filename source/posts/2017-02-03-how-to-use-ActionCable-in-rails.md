---
title: Rails'de ActionCable nedir ve nasıl kullanılır?
date: 2017-02-03
author: h_1520
tags: ruby, rails, server, client, ruby on rails, web, actioncable, websocket
---


# Websocket nedir?

websocket TCP üzerine kurulu HTTP gibi bir protokoldür ve HTML5 ile birlikte gelerek HTTP protokolünün gerçek zamanlı uygulamalardaki eksiklerini kapatmıştır. HTTP request/response mantığı üzerinde kurulu protokoldür yani client tarafından bir istek yapılır ve server tarafından bu isteğe cevap beklenir, durum böyle olunca istek yapmayan clientlar bu requesti alamamaktaydı bu durumda chat uygulamaları gibi gerçek zamanlı uygulamalarda büyük bir problem oluşturmaktaydı. Websokette önce bu problem belirli aralıklarda ajax ile client tarafına sunucu tarafından istek yaparak değişiklikleri göndererek kısmen çözülebiliyordu fakat bu işlem gereksiz veri transferlerine ve yavaşlamaya neden olmaktaydı, websoket ile birlikte bu problemin önüne geçildi yani websoket HTTP’nin aksine kanallar aracılığı ile server tarafında herhangi bir değişiklik olduğunda sadece istek yapan client’a değil kanala bağlı tüm clientlara ilgili değişikliği göndermektedir böylece aradaki bağlantı hiç kopartılmadan gerçek zamanlı olarak sadece yapılan değişiklikler gönderilmiş olur.

# ActionCable nedir?

Action Cable Rails-5 ile gelen ve websocket kullanabilmemiz için geliştirilmiş olan bir kütüphanedir, Rails Conf. Action Cable bize server tarafta ruby ile client tarafta ise javascript ile full-stack bir yapı sunar. Active Record veya ORM modeli ile yazdığımız modellerimize erişebiliriz. Action Cable bir mesajlaşma pattern’ı olan Publisher/Subscriber yaklaşımı kullanarak server ve clientlar arasında bağlantı sağlar.

## Örnek Uygulama:

Teknik detayları aşağıda bulunan DHH’nin örneği üzerinden açıklayacağım.

Öncelikle sırasıyla aşağıdaki işlemleri yapıp uygulamamızı hazırlıyoruz.

Uygulamayı oluşturma: 
```ruby
rails new chat --skip-spring
```

Room adlı controllerımızı oluşturuyoruz:
```ruby
rails g controller rooms show
```

Database’imizi ve Message modelimizi oluşturuyoruz:
```
rails db:create 
rails g model message content:text 
rails db:migrate
```

Message tablomuza yeni bir kayıt oluşturuyoruz:
```ruby
Message.create(content: 'hello world')
```

Son olarak da root düzenliyoruz:
```ruby
root to: 'rooms#show'
```

Controllerımızı ve view sayfalarımızı aşağıdaki gibi güncelliyoruz:
```ruby
# app/controllers/rooms_controller.rb

class RoomsController < ApplicationController
  def show
    @messages = Message.all
  end
end
```

```ruby
# app/views/rooms/show.html.erb

<h1>Chat room</h1>
  
<div id="messages">
  <%= render @messages %>
</div>
  
<form>
  <label>Say something:</label><br>
  <input type="text" data-behavior="room_speaker">
</form>
```


```ruby
# app/view/messages/_message.html.erb

<div class=“message”>
  <p><%= message.content %></p>
</div>

```

ve *‘rails s’* diyip uygulamanın *http://localhost:3000/*’dan kullanıcı tarafındaki görüntüsünü görebiliriz.



ActionCable tarafı için şu işlemleri yapıyoruz:

*config/routes.rb* dosyamıza aşağıdaki satırı koyarak ActionCable’ı monte ediyoruz.
```ruby
mount ActionCable.server => '/cable'
```

Rails projesinin oluşturulması ile birlikte oluşan *javascript/cable.js* dosyamız şu şekildedir:

```javascript
//= require action_cable
//= require_self
//= require_tree ./channels

(function() {
 this.App || (this.App = {});

 App.cable = ActionCable.createConsumer();

}).call(this);
```

Route dosyamıza yukarıdaki satırı ekledikten sonra browser console'umuzdan *“App.cable”* ı yazdığımızda aşağıdaki sonucu alabilmeniz gerekiyor.



Artık örneğimiz için kanal oluşturma zamanı geldi,  rails g channel room speak  ile birlikte iki adet yeni dosyamız oluşacak: javascript tarafı için app/assets/javascripts/channels/room.coffee dosyası ve ruby tarafı için  app/channels/room_channel.rb dosyası oluşacak.

Dosyalarımız başlangıçta şu şekildedir: 

```ruby
#app/channels/room_channel.rb 

class RoomChannel < ApplicationCable::Channel 
    def subscribed 
        # stream_from "some_channel" 
    end
     
    def unsubscribed 
        # Any cleanup needed when channel is unsubscribed 
    end 
    
    def speak 
    end 
end
```

*‘subscriber’* ve *‘unsubscriber’* ActionCable’ın default callback’leridir.

```javascript
#app/assets/javascripts/channels/room.coffee

App.room = App.cable.subscriptions.create "RoomChannel", 

connected: -> 
    # Called when the subscription is ready for use on the server 

disconnected: -> 
    # Called when the subscription has been terminated by the server 

received: (data) -> 
    # Called when there's incoming data on the websocket for this channel 

speak: -> 
    @perform 'speak'

```

*connected* methodu kanal ile ilk bağlantı oluşturulduğunda çalışan methotdur, *received* methodu ise veri geldiğinde çalışan fonksiyondur. *speak* methodu ise clienttan gelen veriyi *room_channel.rb*’nin içindeki *speak* fonksiyonuna gönderdiğimiz methoddur.

Daha sonra veri iletimini gerçekleştirmek için dosyalarımızı şu şekilde göncelliyoruz:

```javascript
#app/assets/javascripts/channels/room.coffee

received: (data) ->
    $('#messages').append data['message']


speak: (message) ->
    @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior~=room_speaker]', (event) ->
    if event.keyCode is 13 # return/enter = send
       App.room.speak event.target.value
       event.target.value = ''
       event.preventDefault()
```   
         

```ruby
#app/channels/room_channel.rb

def speak(data)
    Message.create! content: data['message']
end
```

modelimizin içini bu şekilde güncelliyoruz.

```ruby
#app/models/message.rb

class Message < ApplicationRecord 
    after_create_commit { MessageBroadcastJob.perform_later self } 
end
```
daha sonra Job’ımızı oluşturuyoruz:

```ruby
rails g job MessageBroadcast
```

ve içini bu şekilde güncelliyoruz:

```ruby
class MessageBroadcastJob < ApplicationJob
 queue_as :default

 def perform(message)
   ActionCable.server.broadcast 'room_channel', message: render_message(message)
 end

 private
 def render_message(message)
   ApplicationController.renderer.render(partial: 'messages/message', locals: { message: message })
 end
end
```

İşlemlerimizi tamamladıktan sonra burada işleyen işlemi anlatmanın vakti geldi. Bu uygulama ActionCable’ın mantığını anlatmak adına tek odalı bir chat uygulaması için yapılmış bir uygulamadır istenilirse kod geliştirilerek çok odalı bir chat uygulaması yapılabilir. Uygulamada kullanıcı ‘Say Something:’ kısmından girdiği yazıyı entera basarak gönderir ve server tarafına gelen mesaj *#app/assets/javascripts/channels/room.coffee* dosyasının en altında bulunan javascript fonksiyonu ile yakalanır ve yine aynı klasörde bulunan *speak* methoduna gönderilir, bu dosyadaki *speak* methodu  *#app/channels/room_channel.rb* dosyasındaki *speak* methoduna gelen data *message* olarak gönderilir. *#app/channels/room_channel.rb* dosyasında bulunan *speak* fonksiyonu ile yakalanan data veri tabanındaki *Message* tablosuna 
```ruby 
   Message.create! content: data['message'] 
``` 

ile  kayıt edilir ve *Message* modelinde 
```ruby 
after_create_commit { MessageBroadcastJob.perform_later self } 
```
 ile job tetiklenir. Job çalıştığı anda *render_message* methodunu *‘room_channel’* kanalına 
 
 ```ruby
 ActionCable.server.broadcast 'room_channel', message: render_message(message)
 ```
 
 ile yayınlar. Yayınlanan data işlem yapılmak üzere *#app/assets/javascripts/channels/room.coffee* dosyasının içindeki *received* methoduna gider. Bu fonksiyon ile gelen data kullanıcı tarafına gönderilir.
 Görüldüğü gibi Rails ile websocet işlemlerini yapmak ActionCable ile oldukça kolay. Son olarak bir dip not:
 
 Eğer uygulamanızda Redis kullanıyorsanız cable.yml dosyamızdaki development ayarımızı şu şekilde 
 güncellememiz gerekiyor ve productionda ise Redis tarafından verilen url'i vermeniz gerekmektedir: 
 
  ```ruby
 development:
    adapter: redis
    url: redis://localhost:6379/1
```






