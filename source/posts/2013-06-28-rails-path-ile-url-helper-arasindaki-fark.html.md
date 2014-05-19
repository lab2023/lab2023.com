---
title: Rails Path İle Url Helper Arasındaki Fark
date: 2013-06-28
author: dilekmuhammet
tags: rails url, rails path, routing, tr
---

Merhabalar;

Rails te url helper olarak `_path` ve `_url` kullanıyoruz. Neden bazen `_url` bazen `_path` kullanıyoruz ? Çünkü farklı şeyler. İkiside aynı yolu göstermiş olsa bile. Şimdi her ikisinide inceleyelim.

```ruby
= link_to 'lab2023', users_path
```

Bu helperın html çıktısı şu şekilde;

```ruby
 <a href="/users">lab2023</a>
```

Görüdüğünüz gibi href içerisine `/users` gelmiş. Şimdi diğerini inceleyelim.

```ruby
= link_to 'lab2023', users_url
```

Bu helperında html çıktısı şu şekilde;

```ruby
<a href="http://routing.dev/users">lab2023</a>
```

Aslında bu iki çıktı herşeyi anlatıyor bize. `_url` helper yönlendirmek istediğimiz yolun başına şu anki domani ekleyerek çıktı üretirken `_path` sadece yolu çıktı olarak vermiştir. Bu yüzden view' larda sayfa boyutunu arttırmamak için `_path` kullanıyoruz. Sonuçta `<a href="http://routing.dev/users">lab2023</a>` ile `<a href="/users">lab2023</a>` byte farkı var. Peki `_url` helperını nerede kullanacağız ? Bu heleperıda contollerda `redirect_to` larda kullanıyoruz. Çünkü HTTP standartları 300 kodlarında yani yönlendirmelerde Header içerisndeki Location a verilen url' in tam olmasını zorunlu kılmaktadır.

İyi çalışmalar dilerim.
