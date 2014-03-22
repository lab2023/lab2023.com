---
title: Sass Nedir? Özellikleri nelerdir?
date: 2014-03-03
tags:
  - two
---

Sass genel olarak css derleyicisidir. Css sayesinde var olmuş fakat css’i teknik olarak geçmeyi başarmıştır. Nasıl geçmiş kısaca özetliyorum;

* Css’in değişken tanımlanılabilinen hali (Variables)
* Css’in tarayıcılar için yazdığımız ekstra kodları kendisi oluşturabilen hali(Mixins)
* Css’in girintileri fark ederek iç içe class’ları yazabilen hali (Nesting)
* Css dosyasında istediğimiz kodları istediğimiz yerde extend edebiliyoruz (Extend/Inheritance)
* Css dosyamızı parçalara ayırıp, ayırdığımız kısımları istediğimiz yerde çağırabiliyoruz (İmport)
* Css dosyamızda çarpma,bölme toplama vs. yapabiliyorz. (Operators)

Şimdi artılarını açıklamaya çalışacağım.

**Özellikleri**

**Variables:** Sass’ta değişken tanımlayabildiğimizi söylemiştik. Örneğe bakalım.

Değişkenleri tanımlıyoruz.

```sass
$header-font-style:  Helvetica, sans-serif
$header-color: #000
```

Değişkenleri kullanıyoruz.

```sass
.header
  font: $header-font-style
  color: $header-color
```

**Nesting:** Nesne girintilerine göre kod yazmak.

```sass
#nav
  ul
   color: red
  li
   color: blue
  a
   color: green
```

Css çıktısı:

```css
#nav ul {
  color: red;
}
#nav li {
  color: blue;
}
#nav a {
  color: green;
}
```

**Partials ve @import:** Kodlarımızı bölümleyip istediğimiz yerde import edebiliyoruz.

    /* _reset.sass */
    body
     margin: 0
     padding: 0


Bu dosyayı asıl stil dosyamıza dahil edelim.

    /* base.sass */
    @import 'reset'


**Mixins:** bu özellik sayesinde css3 ün hayatımızı zor bir yoldan kolaylaştıran özelliklerini sıkılmadan uygulayabileceğiz.

    @mixin border-radius($radius)
      -webkit-border-radius: $radius
      -moz-border-radius: $radius
      -ms-border-radius: $radius
      -o-border-radius: $radius
      border-radius: $radius


Mixin'i sass'da çağırıyoruz.

     .box
       @include border-radius(10px)


Bu mixin'inden sonra border-radius kullandığımızda ekstra kodları yazmamıza gerek yok.

**Extend/Inheritance:** class yada id'lerde kullandığımız özellikleri @extend özelliği ile bir sonraki class yada id mizin içinde kullanabiliyoruz.

message class'ı için kodlarımız bunlar.

    .message
      border: 1px solid #ccc
      padding: 10px
      color: #333


Şimdide diğer class yada id'mizde bu kodları extend edelim.

    .success
      @extend .message
      border-color: green

    .error
      @extend .message
      border-color: red


**Operators:** css özelliklerini yazarken operatorleri kullanabileceğimizi biliyor muydunuz? :)

    aside
     float: right
     width: 300px / 960px * 100%


Css çıktısı:

    aside {
     float: right;
     width: 31.25%;
      }

[Safiye Sepetçi](http://twitter.com/safiyesepetci)