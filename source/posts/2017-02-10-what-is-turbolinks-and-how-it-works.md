---
title: Turbolinks Nedir Ve Nasıl Çalışır?
date: 2017-02-10
author: fadimezhan
tags: ruby, rails, turbolinks, speed, web, jquery
---

Turbolinks, Rails'in bir özelliğidir. Gem olarak yüklenebilir. Rails uygulaması oluşturduğunuzda default olarak yüklü gelir.
Uygulama içinde gezinmeyi hızlandırmak için tasarlanmıştır. Uygulamadaki bağlantılara tıklandığında yakalar ve Ajax isteğinde bulunur.
Aldığı içeriği body taglarinin içeriği ile değiştirir. Böylece javascript ve css dosyalarını tekrar tekrar yüklemez. Bu şekilde uygulamaya hız
kazandırır. Turbolinks'in sağlayacağı hız, Javascript ve Css dosyalarının boyutu arttıkça daha önemli hale gelir.
<br/>
Turbolinks, normal sayfa gezinmelerini engellediğinden browser tarafında istek yapıldığına dair iz olmayacaktır. Sunucu yanıt
verene kadar sayfa askıda kalmış görünür. Boşluğu doldurmak için Turbolinks'in yeni versiyonlarında progress bar kullanılıyor.
<br/>
Turbolinks'i dahil etmek için Gemfile dosyasına gerekli gemi ekledikten sonra tek yapmanız gereken; application.js
dosyası içine aşağıdaki kodu eklemek;

```bash
   //= require turbolinks
```
<br/>
## Dikkat Edilmesi Gerekenler

Turbolinks kullanırken dikkat edilmesi gereken bazı noktalar bulunur. Örneğin; Turbolinks tüm javascriptleri yeniden yüklemediğinden bazı sayfalarda hatalara
neden olabilir. Bunun için javascript kodunun Turbolinks'e uygun olarak yazılması gerekir.

JQuery kullanıyorsanız aşağıdaki gibi kullanıyor olabilirsiniz;

```bash
    ready ->
      alert "page has loaded!"
```
Sorun şu ki Turbolinks standart $('document').ready(); fonksiyonunu tetiklemez. Bunun için özel fonksiyon kullanır. Bu sorunu aşağıdaki
yöntem ile çözebilirsiniz.

<br/>
### Jquery ile çözümü

```bash
    ready = ->
        // do stuff
    $(document).on 'ready page:load', ready
```

Ready eventinin tetiklenmesini sağlamak için Turbolinks **page:load** eventi ile çözüm sunar.

<br/>
### Rails'te Kullanımı

 Rails uygulamanızın bazı sayfalarında tüm sayfanın yeniden yüklenmesini isterseniz, yani  Turbolinks'i ilgili bağlantı için kapatmak
 isterseniz aşağıdaki gibi kullanabilirsiniz.

```bash
= link_to root_path, turbolinks: false
```
 Linki verilen sayfa için Turbolinks'i çalıştırmaması sağlanır.
 
Daha detaylı açıklamalar için  [github.com/turbolinks](https://github.com/turbolinks/turbolinks) adresini inceleyebilirsiniz.

