---
title: CSS Medya Sorguları
date: 2014-08-08
author: safiyesepetci
tags: css, css3, media, queries, responsive, tr
---
Web sayfalarının kullandığımız cihaza uyum sağlaması ve bu sayede kullanılabilirliğinin artması
 için css'in bize yarar sağlayabileceği noktalardan birisi de Medya Sorguları kullanabilmemiz.
 Medya sorguları sayesinde mobil cihazlar için eskiden olduğu gibi ekstra bir çaba harcamaya
 gerek kalmıyor. CSS cihazın çözünürlüğünü tanıyıp uygun şekilde stil dönüşümünü yapıyor.
 Şimdi medya tiplerini inceleyerek kısa bir giriş yapalım.

### Medya Tipleri

* all (Tüm araçlar için kullanılır.)
* aural (Ses sentez birimlerinde kullanılır.)
* braille (Braille dokunsal okuyucularda kullanılır.)
* embossed (Braille yazıcı çıktıları için kullanılır.)
* handheld (Taşınabilir telefonlar ve PDA’lar için kullanılır.)
* print (Yazıcı çıktılarında görüntüleme için kullanılır.)
* projection (Projeksiyonda görüntüleme için kullanılır.)
* screen (Bilgisayarda görüntüleme için kullanılır.)
* tty (Bilgisayar terminalleri ve eski taşınabilir araçlar ile görüntülemede kullanılır.)
* tv (Televizyonda görüntülemede kullanılır.)

### Mantıksal Operatörler

Medya sorguları kullanacağımız operatörler and, not ve only'dir.

* And:
Bu operatör ile birden fazla şart sağlayabiliriz. Şartlar sağlanıyorsa özelliklerimiz uygulanır.

Örnek:

```css
 @media screen and (min-width: 768px) and (max-width: 959px)
 {
 .section1 {
     background:blue
     }
 }
```
Örnekte de gördüğümüz gibi screen medya tipi için  min-width: 768px ve max-width: 768px değer
aralığında section1 class'ının arka plan rengi maviye dönüşecek.

* Only:
Bu operatör ile belirlediğimiz ekran özelliği sağlanan kadar geçerli olacak özellikleri belirleyebiliyoruz.

Örnek:

```css
@media only screen and (min-width: 480px)
{
    .section {
        width: 500px;
        background-color: blue;
    }
```
Yukarıda ki örnekte ekran çözünürlüğü 480px'e kadar section class'ının genişliği 500px, arka plan rengi ise mavi olacaktır.

* Not: Medya değeri doğru ise uygulanmayacak özelliklerde kullanılır.

Örnek:

```css
 @media not screen and (color)
 {
     .section {
         font-size: 2em;
     }
```
Bu örnekte de gördüğümüz gibi renkli ekran şartı sağlanıyorsa section class'ının font büyüklüğü 2em olmayacaktır.

Medya sorgularının tüm özellikleri bu kadarla sınırlı değil, bir sonraki blog yazım medya tiplerinin kullanımı üzerine olacak.

