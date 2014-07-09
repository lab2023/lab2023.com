---
title: Tablesaw Tablo Eklentisi
date: 2014-07-09
author: safiyesepetci
tags: tablesaw, responsive , table, tr
---

Tablesaw kullanıma hazır responsive tablo eklentisidir.3 farklı mod'da kullanabiliyoruz. Kullandığımız moda'a göre ek özelliklere yer verebiliyoruz.
Kullanılan modlar:

* Stack
* Toggle
* Swipe

## Stack

Bu mod  640px genişliğe ulaştığında sütunları satır haline getirerek yığın oluşturuyor.

Eklenecek kod:

```html
<table class="tablesaw tablesaw-stack" data-mode="stack">
```

## Toggle ##

Toggle modunda ise istediğimiz sütunları aktif edip, istediğimiz sütunları gizleyebiliyoruz.
Eklenecek kod:

```html
<table data-mode="columntoggle">
```

## Swipe

Swipe modu gizlenen sütunları kaydırma çubuğu ile gezinebilme imkanı veriyor.
Eklenecek kod:

```html
<table data-mode="swipe">
```
### Mini-Map

Toogle ve Swipe modunda minimap özelliğini kullanabiliyoruz. Kullandığımız tabloda sütun olarak nerede olduğumuzu bilmemizi sağlıyor.

```html
<table data-mode="swipe" data-minimap>
```

```html
<table data-mode="columntoggle" data-minimap>
```

### Mode Switcher

İstersek tek tabloya üç modu birden dahil edebiliyoruz.


### Sortable

Sortable özelliği sayesinde istediğimiz sütunu sıralanabilir hale getirebiliyoruz.

```html
<table data-sortable>
    <thead>
        <tr
            <th data-sortable-col>Rank</th>
            <th data-sortable-col>Movie Title</th>
            <th data-sortable-col>Year</th>
            <th data-sortable-col>Rating</th>
            <th>Reviews</th>
        </tr>
    </thead>
```

### Kullanımı

* Stack Modu için;

Sadece stack modunda kullanmak için tablesaw.css ve tablesaw.js dosyalarını projenize dahil etmeniz gerekiyor.

Ekleyeceğimiz dosyalar:

```html
<link rel="stylesheet" href="tablesaw.css">
<script src="tablesaw.js"></script>
```
Bu satırın tablomuzu kullanmak istediğimiz kısma eklenmesi gerekiyor.

```html
<table class="tablesaw tablesaw-stack" data-mode="stack">
```
* Tüm modları ve özellikleri kullanabilmek için;

Bu kısımda toogle modu için  [ Filament Group dialog](https://github.com/filamentgroup/dialog) 'a ihtiyacımız var. Eğer bower kullanıyorsanız

```bash
bower install tablesaw
```

kod satırı ile tablesaw için gerekli tüm paketleri indirebilirsiniz.

Tablesaw'da yer alan tüm mod ve özellikleri kullanbilmek için sayfamıza eklememiz gereken css ve js dosyaları aşağıda ki kodda yer alıyor.

```html
<link rel="stylesheet" href="bower_components/filament-dialog/dialog.css">
<link rel="stylesheet" href="tablesaw.css">

<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/filament-dialog/dialog.js"></script>
<script src="bower_components/filament-dialog/dialog-init.js"></script>
<script src="tablesaw.js"></script>
```

Bu kullanışlı tablo eklentisini [Tablesaw](https://github.com/filamentgroup/tablesaw) adresinden inceleyebilirsiniz.




