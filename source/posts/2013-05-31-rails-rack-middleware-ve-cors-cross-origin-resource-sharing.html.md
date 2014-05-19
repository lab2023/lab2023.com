---
title: Rails, Rack Middleware ve CORS (Cross-origin resource sharing)
date: 2013-05-31
author: toziserikan
tags: cors, cross-origin resources sharing, middleware, rack, rails
---

Merhaba,

Önceki geliştirdiğim projelerden birisinde oldukça zamanımı yiyen CORS konusu hakkında Rails' de bulduğum kısa çözümü sizlerle paylaşmak istiyorum.

Öncelikle CORS konusu hakkında araştırma yapmak isterseniz size aşağıdaki kaynakları önerebilirim;

*   [http://en.wikipedia.org/wiki/Cross-origin_resource_sharing][1]
*   <http://www.w3.org/TR/cors/>

Rails'de bu konuyu response header'ları setleyerek çözüyoruz. Bunun için bir çok çözüm mevcut ama benim gördüğüm kadarıyla en kolay ve sıkı çözüm işi rack katmanında bitirmek. Ama web sunucusu (örn: nginx) katmanında da benzer ayarlar yaparak konuyu çözebiliyorsunuz. Ben en kolay yöntem olan Rack katmanından bahsedeceğim.

`Rack::Cors` adındaki modül ile bu işlemi halletmek için önce aşağıdaki Gem'i rails projemizde Gemfile'a ekliyoruz.

`gem "rack-cors", "~> 0.2.7"`

Bundle install işleminden sonra, `config\application.rb` dosyamıza gidip en alt satırlarda uygun bir yere aşağıdaki satırları ekliyoruz:

  ```
    config.middleware.use Rack::Cors do |requests|
      requests.allow do |allow|
        allow.origins '*'
        allow.resource '*', :headers => :any, :methods => [:get, :post, :put, :delete, :options]
      end
    end
  ```


Yukarıdaki middleware katmanını ayrı bir initializer dosyası hazırlayarak da kullanabilirsiniz. Bu konu için http://guides.rubyonrails.org/rails_on_rack.html#inspecting-middleware-stack adresine bir göz atabilirsiniz.

Bu ayarları yaptıktan ve uygulamanızı yeniden başlattıktan sonra artık response header'larında aşağıdaki gibi bir çıktı görüp farklı kaynaklardan uygulamanıza istekler yapılması sağlanmış olacaktır.

 ```
    Request URL: http://vidipanda-api.dev/videos
    Request Method: POST
    Status Code: 200 OK
    ...
    Access-Control-Allow-Credentials: true
    Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
    Access-Control-Allow-Origin: http://vidipanda-mobile.dev
    Access-Control-Expose-Headers:
    Access-Control-Max-Age:1728000
    ...
 ```

Bu konunun daha detaylı ele alınması gereken bir konu oldugunu düşünüyorum, bu yüzden ilerleyen zamanlarda imkan olursa bir makale daha çıkarmayı planlıyorum, ama siz beni beklemeyin iyisi mi aşağıdaki kaynakçaya bir göz atın...

### Kaynakça

*   <http://www.html5rocks.com/en/tutorials/cors/>
*   <http://www.tsheffler.com/blog/?p=428>
*   <http://www.nczonline.net/blog/2010/05/25/cross-domain-ajax-with-cross-origin-resource-sharing/>
*   <http://enable-cors.org/>
*   <http://remysharp.com/2011/04/21/getting-cors-working/>
*   <http://rack.rubyforge.org/doc/>
*   <http://railscasts.com/episodes/151-rack-middleware>
*   <http://amberbit.com/blog/introduction-to-rack-middleware>
*   [http://rubygems.org/gems/rack-cors https://github.com/cyu/rack-cors][2]

İyi çalışmalar.

 [1]: http://en.wikipedia.org/wiki/Cross-origin%5C_resource%5C_sharing
 [2]: http://rubygems.org/gems/rack-cors%20https://github.com/cyu/rack-cors


