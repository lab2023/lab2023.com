---
title: Turbolinks Nedir Ve Nasıl Çalışır?
date: 2017-02-10
author: fadimezhan
tags: ruby, rails, turbolinks, speed, web, jquery
---

Turbolinks, Rails'in bir özelliğidir. Gem olarak yüklenebilir. Rails uygulaması oluşturduğunuzda default olarak yüklü gelir.
Uygulama içinde gezinmeyi hızlandırmak için tasarlanmıştır. Uygulamadaki bağlantılara tıklandığında yakalar ve Ajax isteğinde bulunur.
Aldığı içeriği body taglarinin içeriği ile değiştirir. Böylece javascript ve css dosyalarını tekrar tekrar yüklemez. Bu şekilde uygulamaya hız
kazandırır. Turbolinksin sağlayacağı hız, Javascript ve Css dosyalarının boyutu arttıkça daha önemli hale gelir.
<br/>
Turbolinks, normal sayfa gezinmelerini engellediğinden browser tarafında istek yapıldığına dair iz olmayacaktır. Sunucu yanıt
verene kadar sayfa askıda kalmış görünür. Boşluğu doldurmak için turbolinksin yeni versiyonlarında progress bar kullanılıyor.
<br/>
Turbolinksi dahil etmek için Gemfile dosyasına gerekli gemi ekledikten sonra tek yapmanız gereken; application.js
dosyası içine aşağıdaki kodu eklemek;

```bash
   //= require turbolinks
```

## Dikkat Edilmesi Gerekenler

Turbolinks kullanırken dikkat edilmesi gereken bazı noktalar bulunur. Örneğin turbolinks tüm javascriptleri yeniden yüklemediğinden bazı sayfalarda hatalara 
neden olabilir. Bunun için javascript kodunun turbolinkse uygun olarak yazılması gerekir.

JQuery kullanıyorsanız aşağıdaki gibi kullanıyor olabilirsiniz;

```bash
    ready ->
      alert "page has loaded!"
```
Sorun şu ki turbolinks yüklenen sayfanın üzerine yazacağından bu event tetiklenmeyecektir. Bunu çözmek için çeşitli çözümler bulunur.

### Jquery ile çözümü

```bash
    ready = ->
        // do stuff
    $(document).on 'ready page:load', ready
```

Ready eventinin tetiklenemesini sağlamak için turbolinks **page:load** eventi ile çözüm sunar.

### Rails ile çözümü

 Rails uygulamanızın bazı sayfalarında tüm sayfanın yeniden yüklenmesini isterseniz turbolinksi ilgili link için kaldırabilirsiniz.

```bash
= link_to root_path, turbolinks: false
```
 Linki verilen sayfa için turbolinksi çalıştırmaması sağlanır.

