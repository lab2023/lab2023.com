---
title: Ubuntu serverda logrotation
date: 2014-05-23
tags: ubuntu, log, logrotate, log rotation, linux
---

Serverlarımızda tutulan log dosyaları bir yerden sonra devasa boyutlara ulaşarak depolanması ve gerektiği zaman incelenmesi eziyer haline gelebiliyor. Bu yüzden log dosyalarımızı parçalara ayırıp bu parcaları sıkıştırarak saklamak, hem lazım olduğu zaman inceleme yapılmasını, hem de log dosyasının diskte tutulduğu alanı oldukça küçültüp sabit diskimizin rahat bir nefes almasını sağlayacaktır.

Bunu yapabilmek için Ubuntu'da logrotate adlı uygulamayı kullanıyoruz. Öncelikle sunucumuza yüklü değilse yüklememiz gerekiyor.

```bash
    sudo apt-get install logrotate
```

Komutunu çalıştırdıktan sonra uygulamamız kurulacaktır. Doğrulamak için terminalde;

```bash
	logrotate
```

yazabilirsiniz. Kurulduysa uygulama bilgilerini gösterecektir.

Gerekli ayarları yapmak için;

```bash
	(sudo) vi /etc/logrotate.conf
```

komutu ile ayar dosyamızı açıyoruz. Uygulamanın en altına düzenlemek istediğimiz log dosyalarının adresini tanımlayıp ayar parametrelerini giriyoruz.

```bash
	/home/deployer/apps/app_name/current/log/*.log {
	  weekly             #Periyot
	  missingok          #Dosyayı Bulamaması durumundaki davranışı
	  rotate 52          #Kaç adet dosya tutacağının sayısı
	  compress           #Sıkıştırma istenip istenmediğine göre eklenir
	  notifempty         #Eğer log dosyası boş ise işlem yapmaz
	  copytruncate       #yedekledikten sonra orjinal log dosyasını silip yeni bir tane oluşturur
	  size 1024M         #Log dosyası boyut sınırı
	}
```

bu parametreler zorunlu olmayıp ihtiyaca yönelik olarak eklenmektedir. Log dosyalarının çabuk genişlediği bir sistemde günlük rotasyon yapmak gerekirken, ihtiyaca göre ayda bir de yapabilirsiniz (daily, weekly, monthly). Hatta örnekteki gibi boyut sınırı da vererek eğer 1 GB'ı aşmadıysa rotasyonu yapmayacaktır. Ayrıca logrotator tutacağı dosya sayısını da sizden istemektedir. 10 verdiyseniz 10 adet yedeğe ulaştığı zaman en eski dosyayı silerek işlemine devam eder, bu yüzden ihtiyacı iyi düşünmeniz veya sıkıştırılmış log dosyalarını farklı bir dosyada yedeklemeniz yararınıza olacaktır. Bunları sağlamak için

```bash
	postrotate
	  ...
	endscript
	
	#veya
	
	prerotate
	  ...
	endscript
```

şeklinde rotasyondan sonra çalışacak scriptler oluşturabilirsiniz.

Eğer yazdığınız scriptin hemen çalışmasını istiyorsanız

```bash
    sudo logrotate -f /etc/logrotate.conf
```

komutunu kullanabilir, ayrıca

```bash
    cat /var/lib/logrotate/status
```

komutu ile de zamanlanmış görevler içerisinde log rotationunuzun durumunu görebilirsiniz.
