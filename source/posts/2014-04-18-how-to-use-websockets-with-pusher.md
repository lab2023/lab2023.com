---
title: How To Use WebSockets With Pusher
date: 2014-04-18
author: toziserikan
tags: websockets, service, pusher, ruby, javascript, en
---

WebSocket technologies has started to become very popular recently. You can create real-time games, chat services etc.
with using WebSocket. But even it isn't a new technology some browsers doesn't support it.

Instead of  sending periodically AJAX request, you can create a persistent connection between client and server and you
can provide that server send messages to clients by this way clients listens to server asynchronously.

There is a lot of way to user WebSocket connections. You can develop your own WebSocket and you can build libraries
with using browsers native APIs. But if you do this you will need to create different protocols for different browsers.

Thus, there is a lot of SAAS applications which you can integrate more quick and easy. Pusher is one of these services.
I want to introduce this service to you and show how to implement Pusher with Ruby and JavaScript.

### Pusher what provides?

* Pusher works as a proxy between client and server.
* Pusher APIs can used by many server and client side languages such as JavaScript,
  Ruby, PHP, Python, Node.js, Java, iOS, Android, Flash etc.
* If you are work in browser that doesn't support WebSocket, Pusher automatically gets activated Flash-based version.
  In this way, Pusher will work good for old generation web browsers.
* If you don't use only WebSocket communication, Pusher give good RestFul API for you.

### How to use Pusher?

First you must create a new [Pusher Account](https://app.pusherapp.com/accounts/sign_up)
Then the service will ask you to create an App and after you create App you can take API Keys.

The following lines allow client enables connected the specified channel.

```html
<!DOCTYPE html>
<head>
  <title>Pusher Test</title>
  <script src="http://js.pusher.com/2.2/pusher.min.js" type="text/javascript"></script>
  <script type="text/javascript">
    var pusher = new Pusher('your_api_key');
    var channel = pusher.subscribe('test_channel');
  </script>
</head>
```

To listen for incoming messages...

```javascript
channel.bind("my-event", function(data) {
  console.log(data)
});
```

You can use following lines to publish messages by the little ruby server app.
This is a simple Sinatra app. Next step you can save the file name ```socket-app.rb```
and run this command ```$ ruby socket-app.rb``` in the console.

```ruby
require 'sinatra'
require 'pusher'

Pusher.url = "http://your_api_key:your_secret_key@api.pusherapp.com/apps/your_app_id"

get '/hi' do
  Pusher['test_channel'].trigger('my_event', {
    message: 'hello world'
  })
  "Success!"
end
```

That's all.


The Pusher [website](http://pusher.com/) provides good documentation, a selection of tutorials for Ruby and JavaScript.

For more information [http://pusher.com/](http://pusher.com/)

Regards.