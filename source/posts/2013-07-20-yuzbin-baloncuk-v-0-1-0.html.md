---
title: Yuzbin Baloncuk  (v.0.1.0)
date: 2013-07-20
author: coskuntekin
tags: haml, sass, compass, tr
---

lab2023 ‘ un logosundan baloncuk cıkartabilir miyiz dedik ve basladik kodlamaya. Eger siz de bunu evde denemek istiyorsaniz [buradan][1] kodlara ulasabilirsiniz.

Bizler HAML, SASS ve COMPAS teknolojilerinden yararlandik. Generator olarak da MIDDLEMAN kullandik.

**Kulladigimiz CSS3 Property lerini kısaca açıklamak gerekirse;**

**+keyframes(fly-bubble)**

keyframes ile tıpkı bir gif animasyon ya da flash animasyon hazırlar gibi animasyonu layer lara parçalayıp hareketlilik kazandırabilirsiniz. Keyframe bir animasyon adına ihtiyac duyar ve from ile baslayıp to ile biter. Dilerseniz from ve to yerine 0% ve 100% degerlerini de kullanabilirsiniz. Her bir layer yuzdelik dilemlerle ifade edilir. Bu layer lara da olusturmak istenilen animasyona gore css style yazmak mumkundur. Keyframe methodlari;

*   animatename
*   keyframe-selector
*   css style

**+transform(scale(.3))**

Bunu basta acıklamakta yarar goruyorum. CSS3 Property leri icinde iki tip transform mevcut; 2D transform ve 3D transform bizler bu animasyonda 2D transform kullandik.

2D Transform un 4 adet methodu vardır. Bunlar;

*   Scale
*   Translate
*   Skew
*   Matrix
*   Rotate

**scale** methodu x-axis (x-ekseni) ve y-axis (y-ekseni) seklinde iki deger alır. Bu deger width ve height degerlerine tekabul eder. Bu degerler farklı farklı verilebilecegi gibi (+transform(scale(6,8))) beaker bubble da kullanildigi gibi tek bir deger de verilebilir.

**+animation-timing-function(ease-in-out)**

Animasyonun hızına farklı ozel degerler atayarak animasyonun gercege yakın bir hareketlilik kazanmasini saglar. Ornegin bir topun yavaslayarak durmasi icin animation-timing-function dan yararlanilabilir.

Dort adet methodu vardır. Bunlar;

*   linear
*   ease
*   ease-in
*   ease-out
*   ease-in-out
*   cubic-bezier

**ease-in-out** ile animasyon hareketine yavas baslar ivme kazanarak hızlanır ve harekete basladigi gibi yavaslarak durur.

**+animation-name(fly-bubble)**

keyframe-name de kullanılmıs olan alias animate-name ile çağrılmıs olur.

**+animation-duration(8s)**

Animasyonun hareket suresini ihtiva eder.

**+animation-iteration-count(infinite)**

Animasyonun kaç kez oynayacagini gosterir. infinite ile sonsuz bir tekrar olusturulurken, bir tam sayı ile bu dongu sınırlandırabilir.

**Not:** İlerleyen zamanlarda animasyonu biraz daha gelistirmeyi dusunuyoruz. Ornegin icindeki sıvının dalgalanmasi baloncuklarin harekitinin iyilestirilmesi gibi dusucelerimiz var.

**Github Safyasi:** <https://github.com/coskuntekin/beaker-bubbles>

Tesekkur Ederim.

 [1]: https://github.com/coskuntekin/beaker-bubbles
