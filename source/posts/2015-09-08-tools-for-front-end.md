---
title: Popüler front-end araçları
date: 2015-09-08
author: safiyesepetci
tags: grunt, yeoman, bower, gulp, js, npm, node
---
Teknolojinin geldiği konum ve ulaşılabilirliğinin artmasıyla web teknolojileri hayatımızda farklı bir noktaya yükseldi. Genel anlamda gelişen teknolojide önyüz kodlayıcıları için faydalı bazı araçları tanıtacağım.

### Bower

![bower] (../assets/images/articles/25-09-08-tools-for-front-end/bower.jpg)


Bower bir front-end kütüphanesidir. Diğerlerinden ayıran özelliği ise projemizde kullanacağımız paketi kurduğumuzda bu paketin çalışması için gerekli olan diğer paketleri de kurması.

Mesela bootstrap’ı indirdiğimizde jquery’ide indiriyor.

### Kurulumu:

Npm kullanarak kuracağız. Bower paket yöneticisini kullanabilmemiz için bilgisayarımızda [nodejs](https://nodejs.org/en/) ve [git](https://git-scm.com/)’in kurulu olması gerekiyor.

```bash
npm install -g bower
```
### Paket Kurulumu:

Şimdi binlerce paket içerisinden istediğimizi kullanabiliriz.

```bash
bower install bootstrap
```
Çıktısı:

![bower] (../assets/images/articles/25-09-08-tools-for-front-end/bower-bootstrap.jpg)

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
### init
Bower’ın bir diğer güzel özelliği ise projemizde kullandıgımız paketleri

```bash
bower init
```
komutu ile json dosyası olarak saklaması ve dosya sayesinde aynı paketleri baska projelerde de kullanabilmesi. Bu sayede farklı bir projede yine aynı paketleri kullanacaksak yaptığımız işlem sayısını azaltmıs oluyoruz.

Oluşturduğumuz bu bower.json dosyasını kullanmak istediğimiz projenin dizinine ekleyip

```bash
bower install
```
kodunu çalıştırmamız yeterli oluyor.

Diyelim ki bower init komutunu çalıştırdıktan sonra projeye yeni paketler dahil ettik ve bunlarıda .json dosyamıza eklemek istiyoruz. Bu işlemide

```bash
bower install paket-adi --save
```
ya da

```bash
bower install paket-adi -s
```
komutu ile yapabiliyoruz.

### list

Projenizde kullandığınız paketleri

```bash
bower list
```
komutuyla konsolda listeyebilirsiniz.

### search

Aradığınız paketin adıyla arama yaptırabilirsiniz.


```bash
bower search paket-adi
```

Çıktısı:
![bower] (../assets/images/articles/25-09-08-tools-for-front-end/bower-search.jpg)

### update

Kurduğumuz paketleri güncellemek istersek

```bash
bower update
```

komutu ile kurulu bütün paketleri,

çıktısı:

![bower] (../assets/images/articles/25-09-08-tools-for-front-end/bower-update.jpg)

```bash
bower update paket-adi
```
ile de sadece güncellemek istediğimiz paketi güncelletebiliyoruz.

çıktısı:

![bower] (../assets/images/articles/25-09-08-tools-for-front-end/bower-update-name.jpg)

### uninstall

Kurduğumuz paketi projeden kaldırmak istersek,

```bash
bower uninstall paket-adi
```
komutunu kullanıyoruz, json dosyasından da kaldırmak için --save komutunu eklememiz gerekiyor.

Bower’ın özellikleri tabii ki bu kadar değil. [www.bower.io](http://bower.io/) adresinden bütün detaylara ulaşabilirsiniz.

### Gulp
![gulp] (../assets/images/articles/25-09-08-tools-for-front-end/gulp.jpg)

Bu araç sayesinde projemizin rutin işlerini otomatize edebiliyoruz. Hepimiz web sayfasını yayına almadan önce bazı bazı işlemleri tekrar tekrar yapıyoruz. Kullandığımız fotoğrafların boyutlarını değiştirmek, css dosyamızı küçültmek, yazdığımız js’leri tek dosya haline getirmek gibi. Bu ve bunlar gibi rutin işlerimizi gulp sayesinde otomatize edebiliriz.

Şimdi ilk olarak gulpjs'i makinemize kuralım. Gulp da bower ve grunt gibi npm’e gereksinim duyuyor. Gulp kullanacağımız modülleri npm veritabanından çekiyor.

### Kurulumu:

```bash
npm install gulp -g
```
Projemize ya da localimize kurduktan sonra gulpfile.js dosyası oluşturup yaptıracağımız görevleri buraya yazıyoruz.

![gulp] (../assets/images/articles/25-09-08-tools-for-front-end/gulp-js.jpg)

Verdiğimiz görevler için kurulan plugin ya da paketler ise node_modules/ klasörü altına ekleniyor.

Sonrasında ise işimize yarayacak paketleri bulup entegre edeceğiz. Bu paketleride istersek [gulpjs](http://gulpjs.com/plugins/)'in sayfasından istersekte [npmjs](https://www.npmjs.com/)'in sayfasından bulabılırız.

```bash

npm install paket-adi

```
yukarıdakı komut satırıda paketleri kurmaya yarıyor. Paket kurulumundan sonra kurduğumuz paketin parametrelerini gulpfile.js dosyamıza eklememiz gerekiyor.
Aşağıdaki gulpfile.js dosyasında [gulp-concat](https://www.npmjs.com/package/gulp-concat), [gulp-coffee](https://www.npmjs.com/package/gulp-coffee) ve [gulp-uglify](https://www.npmjs.com/package/gulp-uglify) eklentileri kullanılmış.

![gulp] (../assets/images/articles/25-09-08-tools-for-front-end/gulp-ext.jpg)

Kurduğumuz paketler proje dosyamızın içindeki node_modules dosyasına ekleniyor.

İstediğimiz paketleri kurduktan ve gulpfile.js dosyasına ekledikten sonra ise komut satırına

```bash
gulp
```
yazdığımızda bütün görevleri çalıştırıyor.

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

Kurduktan sonra node_modules/ klasörü oluşturuyor, bu klasörde kuracağımız paket ve pluginler tutuluyor.

Şimdi grunt.js dosyası oluşturup görevlerimizi oraya yazacağız. Genel olarak gulpjs'le aynı yapıda. Farklılıkları görev yazma aşamasında ortaya çıkıyor.

![grunt] (../assets/images/articles/25-09-08-tools-for-front-end/grunt-sample.jpeg)

Yukarıda kaynağı grunt-project dizininde bulunan sample.js dosyasını add-sample.min.js dosyasına dönüştürecek görev için yazılmış kodlar yer alıyor.

Kurduğumuz plugin'lerin açıklamaları ve parametreleri github ya da kendi sayfalarında yazıyor.

Pluginleri [gruntjs](http://gruntjs.com/plugins)'in sayfasından ya da [npmjs](https://www.npmjs.com/)'in sayfasından bulup kurabilirsiniz. Kullanabileceğimiz bütün metotlara gruntjs'in [API](http://gruntjs.com/api/grunt) sayfasından ulaşabilirsiniz.

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

Yeoman gruntjs ve bower araçlarını default olarak projeye dahil ediyor.

oluşturmak istediğimiz projede kullanacağımız paketleri [generators](http://yeoman.io/generators/) ya da [npmjs](https://www.npmjs.com/) sayfasından bulup inceleyebilirsiniz.

Paket kurulumu için:

```bash
npm install --global paket-adi
```

Paketi kurup yo komutunu çalıştırarak ya da

```bash
yo paket-adi
```
komutunu çalıştırarak template oluşturabiliriz.


Çalıştırmak için komut satırına:

```bash
yo
```
komutunu yazıyoru.

![yeoman] (../assets/images/articles/25-09-08-tools-for-front-end/yeoman-yo.jpeg)

Yukarıda yo komutundan sonra sistemde yüklü template yapılarını secip kullanabileceğimiz gibi install a generator komutunu seçerekte yeni template yükleyebiliyoruz.

Yukarıda bahsettiğim bütün araçlar paket kurmak için npm'e ihtiyac duyuyor. Bu yuzden plug-in ve paket kurulumları aynı.

Yeoman ile html5 template’i oluşturmak istiyorsak

```bash
npm install --global generator-h5bp
```
komutunu kullanarak önce html5 paketini indiriyoruz. Sonrada

```bash
yp h5bp
```
komutu ile template oluşturuyoruz.


Detaylı bilgi için  [www.yeoman.com](http://yeoman.io/) adresini inceleyebilirsiniz.



