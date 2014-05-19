---
title: Rails Uygulamalarını Heroku'da Çalıştırmak
date: 2013-07-31
author: hamitturkukaya
tags: heroku
---

[Heroku][1] 0 ayar ile web uygulamalarınızı üstünde kolaylıkla çalıştırabileceğiniz bir servistir.

Uygulamamızı çalıştırmadan önce ilk iş olarak [Heroku][1]'ya üye olmamız ve [heroku gem][2]ini kurmamız gerekiyor.

Bunun için;

```
    gem install heroku
```

diyerek gemi kuruyoruz.

Ardından

```
    heroku login
```

komutunu çalıştırarak bilgilerimizle giriş yapıyoruz.

Ardından projemize git'i initialize etmediysek,

```
    git init
    git add .
    git commit -m 'first commit for heroku'

```

Eğer initialize edildiyse sadece commitinizi yapıp 2. aşamaya geçebilirsiniz.

Sıradaki işlem herokuda bir uygulama oluşturmak. Bunun için terminalde

```
    heroku create <uygulama adı> --region eu

```
komutunu çalıştırarak uygulamamızı oluşturabiliriz.

Artık tek yapmamız gereken uygulamamızda GemFile'ımıza

```
    gem 'pg'
```

yi ekledikten sonra uygulamayı herokuya göndermek.

Bunun için

```
    git push heroku master
```

komutunu kullanıyoruz.

Artık uygulamanız heroku'da çalışır halde ziyaret etmek için

```
    heroku open
```

yazıp sayfayı görüntüleyebilirsiniz.

Bunun yanında herokuda terminal işlemleri yapmak için "heroku run" komutunu kullanıyoruz

```
    heroku run rake db:migrate
    heroku run bundle instal

```
gibi. Ayrıntılı listeye

```
    heroku --help
```

ile ulaşabilirsiniz.

 [1]: https://www.heroku.com/
 [2]: https://github.com/heroku/heroku

 [Hamit Türkü KAYA](http://twitter.com/hamitturkukaya)