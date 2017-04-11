---
title: Rails Verilerine Javascript Üzerinden Ulaşmak
date: 2017-02-03
author: fadimezhan
tags: rails, data, javascript, gon, ruby, fundamentals, tr
---

Merhaba,

Bu yazımda sizlere Gon gem'inin kullanımı ve Rails ile Javascript kullanırken GON sayesinde Rails tarafından oluşturulan 
değişkenlerin Javascript tarafına nasıl aktarılacağını ve erişilebileceğini anlatmaya çalışacağım.

Javascript dosyasından HTML elementlerine herhangi bir veri içeriğini eklemek ve başka yerlerden erişmek için ```data``` özelliği kullanılır.
Data ile HTML elemanlarına veriler ekler ve bu verilere erişme imkanı bulabiliriz. 

Basit bir örnek kullanımı aşağıdaki gibidir;

index.html.haml dosyasında:

```ruby
  content_tag "div", id:"products", data: { url: products_url } 
```

application.js.coffee dosyasında;

```jQuery
jQuery->
  console.log $(‘#products’).data(‘url’)
```

Bu şekilde kullandığımızda konsola data-url değerini basacaktır.

# Gon Gem
Gon gem'i, Rails değişkenlerinize javascript dosyalarınızdan erişmenizi sağlayan bir gem'dir.

Javascript dosyanızda kullanmanız gereken bir veri olduğunda bunu view dosyalarından parse etmek yerine bu gem sayesinde
Rails verilerini kullanabileceğiniz işlerinizi kolaylaştıran bir araçtır.

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

Javascript dosyasından;


```sh
  gon.your_variable 
```

ile veriye erişebilirsiniz. İşte bu kadar.

Faydalı bir kullanımı da var. ```gon.watch```ile sayfayı yenilemeden tutulan veriyi güncelleyebiliyorsunuz.

```gon.watch``` kullanımı ise şu şekildedir;

normalde gon.your_variable şeklinde oluşturduğunuz değişkeni; ```gon.watch.your_variable``` şeklinde oluşturuyorsunuz.

Daha sonra javascript dosyalarınızda aldığı bazı parametreler ile kullanabilirsiniz. Örneğin: 
```gon.watch(name_of_variable, options, callback)``` parametreleri ile kullanılabilmektedir.

```sh
gon.watch('your_variable', interval: 1000, function_name)
```

* **name_of_variable:** controllerda tanımladığımız değişken
* **options:**
     * **interval:** gon.watch için döngü oluşturmayı sağlar, döngü başarılı olduğunda callback çağrılır.
     * **method:** ajax istekleri için method
	 * **url:** ajax istekleri için url 
* **callback:** ajax isteği başarılı olduğunda çağırılacak olan fonksiyondur.

# Rabl Gem
Rabl, json cevapları için bir gem'dir. Açılımı Ruby API Builder Language şeklindedir. 

JSON ise verinin hızlı ve küçük boyutlarda erişimini sağlar. Bilindiği üzere JSON, xml’in javascript ile uyumlu ve daha hızlı 
kullanımını sağlayan bir alternatifidir.

### Nasıl kullanılır?
Gemfile dosyasına;

```sh
 gem ‘rabl’
``` 
eklenir.

JSON formatlı cevap dönmesini istediğimiz html sayfasının json.rabl uzantılı halini oluşturmalıyız. Örneğin index.html.haml sayfası için index.json.rabl dosyası oluşturmalıyız.
Örnek kullanımı aşağıdaki şekildedir;

index.json.rabl dosyasına:

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


Umarım bu yazım sizlere açıklayıcı ve ilgili araçların kullanımı ile ilgili fikir verici olmuştur.

İyi çalışmalar.