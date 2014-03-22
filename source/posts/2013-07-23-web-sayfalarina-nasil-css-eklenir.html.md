---
title: Web sayfalarına nasıl css eklenir?
date: 2013-07-23
twitter: safiyesepetci
tags:
  - css
---

**Web Sayfalarına Css eklemek**

***1- Kod İçinde(İn-line):***

Bu yöntemle html elementinin içine style özelliği kullanılarak eklenilebilir.

Örnek:

    <div style=”color:blue; width:150px;” > Deneme Yazısı </div>


Her tag’e özellik atamak kullanışlı değildir, özel durumlarda kullanılması uygundur.

***2- Head tag’leri arasına style elementi kullanılarak:***

`<head>...</head>` tag’leri arasına `<style>...</style>` elementinin içinde kullanılır.

Örnek:

    <head>
        <title>Site Başlığı</title>
        <style type=”text/css”>
            .content{
                color: pink;
                width: 200px;
                height: 500px;
                }
            a.title{
                width: 100px;
                height: 50px;
                }

    </style>
    </head>


***3-Harici stil dosyası ekleme:***

Bu yöntemde stil özelliklerimizi .css uzantılı ayrı bir sayfaya yazarız. `<head>...</head>` tag’leri arasındada css dosyamızın yolunu belirterek etkinleştirmiş oluruz.

Örnek: style.css adlı stil dosyası

    p{
      color: black;
      font-family: Tahoma, arial;
     }

    #content{
      width: 500px;
      height: auto;
     }


Bu sayfanın web sayfasına eklenmesi aşağıda gösterilmiştir.

Örnek:

    <head>
        <title>Sayfamızın Başlığı</title>
        <link rel=”stylesheet”  href=”style.css”   type=”text/css” />
    </head>


***4- @import yöntemi ile:***

Bu yöntem kullanılış yönünden 2. yönteme, çalışma mantığı yönündende 3. yönteme benzer. İçerik bakımından yüklü sitelerde bölümlere ayrılmış stil yapısı için kullanımı uygundur.

Örnek:

    <head>
        <title>Site Başlığı</title>
        <style type=”text/css”>
    @import “style.css”;
    @import “sidebar.css”;
    @import “footer.css”;
    </style>
    </head>
