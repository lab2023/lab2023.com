---
title: The Semantic Grid System, Yarının Sayfa Düzeni
date: 2013-07-14
author: yunusozcan
tags: samantic grid system, tr
---

**HTML5** bildiğiniz gibi semantik etiketlerle birlikte geldi ama hala tam anlamıyla kullanmıyoruz. başlayacağımız nokta tam olarak grid sistemleri olacak 960.gs vs.. tam olarak bu akıma uymadıklarını düşünüyordum ki başkası daha önce düşünmüş less ve **sass** **mixin** kütüphanesi olarak [semantic grid sistemi][1] oluşturmuş. son zamanlarda pek güncellenmemiş olsada halen kullanılabilir durumda.

Kullanabileceğiniz 4 adet değişken $column-width, $gutter-width, $columns, $total-width

4 adetde mixin var row, column, pull, push

En basit olarak şöyle bir **sass** kodundan

```sass
$column-width: 60px
$gutter-width: 20px
$columns: 12
$total-width: 100%
header
    +column(12)
nav
    +column(12)
section
    +column(9)
aside
    +column(3)
article
    +column(12)
footer
    +column(12)

```

Şöyle Bir **haml** kodundan

```haml
%header
  %h2 Header
%nav
  %h2 Menu
%section
  %h2 Main
%aside
  %article
    %h2 aside
  %article
    %h2 aisde
%footer
  %h2
    Copyright © 2013
```

Hem **fixed** hem **fluid** olarak bu düzene ulaşabilirsiniz.

![semantic html5](articles/2013-07-14-html5-semantic.jpg)

Gelelim asıl konuya yeni [bourbon][3] adlı bie mixin kütüphanesi çıktı aynı şekilde bu kütüphanenin [neat][4] adında şirinmi şirin mixinler içeren **Semantik** grid sistemi var üstteki konuyla ilgilendiyseniz bakmanızı (kullanmanızı) tavsiye ederiz.

 [1]: http://semantic.gs/
 [2]: http://www.lab2023.com/wp-content/uploads/2013/07/html5-semantic.jpg
 [3]: http://bourbon.io/
 [4]: http://neat.bourbon.io/
