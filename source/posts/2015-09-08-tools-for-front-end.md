---
title: Popüler front-end araçları
date: 2015-09-08
author: safiyesepetci
tags: grunt, yeoman, bower, gulp, js, npm, node
---
Teknolojinin geldiği konum ve ulaşılabilirliğinin artmasıyla web teknolojileri hayatımızda farklı bir noktaya yükseldi. Genel anlamda gelişen teknolojide önyüz kodlayıcıları için faydalı bazı araçları tanıtacağım.

### Bower

![bower] (../assets/images/articles/25-09-08-tools-for-front-end/bower.jpg)


Bower bir front-end kütüphanesidir. Diğerlerinden ayıran özelliği ise projemizde kullanacağımız paketi kurduğumuzda bu paketin çalışması için gerekli olan yan paketleri de kurması.

Mesela bootstrap’ı indirdiğimizde jquery’ide indiriyor.

### Kurulumu:

```bash
npm install -g bower
```

Npm kullanarak kuracağız. Bower paket yöneticisini kullanabilmemiz için bilgisayarımızda nodejs ve git’in kurulu olması gerekiyor.

### Kullanımı:

Şimdi binlerce paket içerisinden istediğimizi kullanabiliriz.


```bash
bower install bootstrap
```

Kulanmak istediğimiz paketin tam adını, github proje linkini, proje linkini ya da github proje uzantısını yazarak kurabiliriz.

```bash
bower install twbs/bootstrap
```
```bash
bower install git://github.com/twbs/bootstrap
```
```bash
bower install http://example.com/script.js
```

Bower’ ın bir diğer güzel özelliği ise projemizde kullandıgımız paketleri

```bash
bower init
```
komutu ile json dosyası olarak saklaması ve dosya sayesinde aynı paketleri baska projelerde de kullanabilmesi. Bu sayede farklı bir projede yine aynı paketleri kullanacaksak yaptığımız işlem sayısını azaltmıs oluyoruz.

Oluşturduğumuz bu bower.json dosyasını nerede kullanacaksak

```bash
bower install
```
kodunu çalıştırmamız yeterli oluyor.

Diyelim ki farklı projede calısırken yeni bir paket ekledik ve onuda json dosyamıza eklemek istiyoruz. Bu işlemide

```bash
bower install paket-adi -save
```

komutu ile yapabiliyoruz.

Bower’ın özellikleri tabii ki bu kadar değil. [www.bower.io](http://bower.io/) adresinden bütün detaylara ulaşabilirsiniz.

### Gulp
![gulp] (../assets/images/articles/25-09-08-tools-for-front-end/gulp.jpg)

Bu araç sayesinde projemizin rutin işlerini otomatize edebiliyoruz. Hepimiz web sayfasını yayına almadan önce bazı bazı işlemleri tekrar tekrar yapıyoruz. Kullandığımız fotoğrafların boyutlarını değiştirmek, css dosyamızı küçültmek, yazdığımız js’leri tek js haline getirmek gibi. Bu ve bunlar gibi rutin işlerimizi gulp sayesinde otomatize edebiliriz.

Şimdi ilk olarak gulpjs i makinemize kuralım. Gulp da bower ve grunt gibi npm’e gereksinim duyuyor. Gulp kullanacağımız modülleri npm veritabanından çekiyor.


### Kurulumu:

```bash
npm install gulp
```
Projemize ya da localimize kurduktan sonra node_modules/ klasörü altına bir klasör açıp içinede node js paketlerinin listesini tutan packege.json dosyası yaratıyor. Var olan ya da ekleyeceğimiz paketler bu dosyada tutuluyor.

Sonrasında ise işimize yarayacak paketleri bulup entegre edeceğiz. Bu paketleride istersek gulpjs in sayfasından isstersekte npm in sayfasından bulabılırız.

```bash

npm install gulp-coffee

```
yukarıdakı komut satırıda paketleri kurmaya yarıyor. Kurduğumuz paketler proje dosyamızın içindeki node_modules dosyasına ekleniyor.

İstediğimiz paketleri kurduktan sonra ise komut satırına

```bash
gulp
```
yazdığımızda bütün paketleri çalıştırıyor.

Gulpjs için daha detaylı bilgiye [www.gulpjs.com](http://gulpjs.com/) adresinden ulaşabilirsiniz.

### Grunt
![grunt] (../assets/images/articles/25-09-08-tools-for-front-end/grunt.jpeg)

Gruntta tıpkı gulpjs gibi bir iş kolaylaştırıcı. Kullandığı modülleri npm veri tabanından çekiyor.

### Kurulumu:
```bash
 npm install grunt
```

Grunt için kullanacağımız plug-in ya da modüller içinde

```bash
npm install paket-adi
```
komutunu kullabiliyoruz.

Kurduktan sonra node_modules/ klasörü altına grunt klasörü açıyor ve içine package.json dosyasını olusturuyor.

Daha detaylı bilgi için  [www.gruntjs.com](http://gruntjs.com/) adresini inceleyebilirsiniz.

### Yeoman

![yeoman] (../assets/images/articles/25-09-08-tools-for-front-end/yeoman.jpeg)


Yeoman npm'i kullanarak sürecimizi hızlandıran bir diğer front-end aracımız. Projemiz için template olusturuyor.

Bilgisayarımıza kurabilmek için node.js ve git in yüklü olması gerekıyor.

### Kurulumu

```bash
npm install yo
```
komutuyla yükleyebiliyoruz.

Yukarıda bahsettiğim bütün araçlar paket kurmak için npm'e ihtiyac duyuyor. Bu yuzden plug-in ve paket kurulumları aynı.

Html5 template’i oluşturmak istiyorsak

```bash
npm install --global generator-h5bp
```
komutunu kullanıyoruz.

Yeoman’in web sayfasında  kullanabileceğimiz paketleri arayabiliyoruz.

Detaylı bilgi için  [www.yeoman.com](http://yeoman.io/) adresini inceleyebilirsiniz.



