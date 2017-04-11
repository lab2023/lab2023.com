---
title: Rails Verilerine Javascriptten Ulaşmak
date: 2015-12-22
author: fadimezhan
tags: rails, data, javascript, gon, raby
---


Javascript dosyasından verilere ulaşmak için data kullanılır. Data ile html elemanlarına özel attribute ekleyebiliriz. Bunun kullanımı aşağıdaki gibidir;

Index.html.haml dosyasında:
```ruby
  content_tag "div", id:"products",data: {url: products_url} 
```

Application.js.coffee dosyasında;
```jQuery
jQuery->
  alert $(‘#products’).data(‘url’)
```

Bu şekilde kullandığımızda “localhost:3000/products” alertini ekrana bastırır.

# Gon Gem
Gon gemi, rails değişkenlerinize javascript dosyalarınızdan erişmenizi sağlayan bir gemdir.
Javascript dosyanızda kullanmanız gereken bir veri olduğunda bunu view dosyalarından parse etmek yerine kullanabileceğiniz kolay bir yöntemdir.

### Kullanımı:

Gemfile dosyasına;

```sh
 gem ‘gon’
```

app/views/layouts/application.html.haml dosyasına head tagleri arasına;
```sh
 = Gon::Base.render_data
```

Controller.rb dosyasına;
```sh
  gon.your_variable  = variable_value
```

javascript dosyasından;
```sh
  gon.your_variable 
```
ile veriye erişebilirsiniz. İşte bu kadar.

Faydalı bir kullanımı da var. **gon.watch** ile sayfayı yenilemeden tutulan veriyi güncelleyebiliyorsunuz.

gon.watch kullanımı ise şu şekildedir;

normalde gon.your_variable şeklinde oluşturduğunuz değişkeni; **gon.watch.your_variable** şeklinde oluşturuyorsunuz.

Daha sonra javascript dosyalarınızda aldığı bazı parametreler ile kullanabilirsiniz. **gon.watch(name_of_variable, options, callback)** parametreleri ile kullanılıyor.

```sh
gon.watch('your_variable', interval: 1000, function_name)
```

* name_of_variable: controllerda tanımladığımız değişken
* options:
     interval: gon.watch için döngü oluşturmayı sağlar, döngü başarılı olduğunda callback çağrılır.
     method: ajax istekleri için method
	 url: ajax istekleri için url 
* callback: ajax isteği başarılı olduğunda çağırılacak olan fonksiyondur.

# Rabl Gem
Rabl, json cevapları için bir gemdir. Açılımı Ruby API Builder Language şeklindedir. Json ise verinin hızlı ve küçük boyutlarda erişimini sağlar. Json, xml’in javascript ile uyumlu ve daha hızlı kullanımını sağlayan bir alternatifidir.

### Nasıl kullanılır?
Gemfile dosyasına;
```sh
 gem ‘rabl’
``` 
eklenir.

Json formatlı cevap dönmesini istediğimiz html sayfasının json.rabl uzantılı halini oluşturmalıyız. Örneğin index.html.haml sayfası için index.json.rabl dosyası oluşturmalıyız.
Örnek kullanımı aşağıdaki şekildedir;

Index.json.rabl dosyasına:
```ruby
 object @products
 attributes :id,:name,:published_at

 if current_user.admin?
   node(:edit_url) { |product| edit_product_url(product) }
end
```

Rabl dosyalarını html içine gömerek kaynak kodda görüntüleyebiliriz. Bunu için;
```haml
#products{data: {articles: “ = render (template: ‘articles/index.json.rabl’)”}} 
```

kodunu ekleyelim.
## Gon geminin Rabl İle Kullanımı
Javascripte kullanmak istediğiniz veriyi rabl dosyasından çekebiliriz. Bunun için;

Index.json.rabl dosyası oluşturalım;
```ruby
 collection Product.limit(10)
 attributes :id,:name,:price
```
Products_controller.rb dosyasında;
```ruby
def index
  gon.rabl “app/views/products/index.json.rabl” , as: “products”
end   
```
Application.js.coffee dosyasına;
```js
gon.products if gon     
```
şeklinde kullanabiliriz.
