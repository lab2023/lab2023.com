---
title: Taps ile MySQL' den PostgreSQL' e Veri Aktarma
date: 2013-09-10 17:10 UTC
tags: mysql, postresgl, taps
---

Merhabalar,

Şirket olarak 8 ay önce PostgreSQL' e geçmiştik ama o zamanlar devam edegelen projeleri iş yoğunluğundan dolayı PostgreSQL' e geçiremedik. Aslında bu bizim için ek bir maliyetti. Şimdi tüm projelerimizi PostgreSQL' e geçirmeye başladık.

Bu işlemler için [Taps][1] gemini kullanıyoruz. Alternatif olarak [Valkyrie][2] geminide kullanabilirsiniz.

Taps' ta server ve client olarak iki kavram var. Veritabanınızın birisini server yapıyorsunuz diğerini client. Client olan veritabanında pull ve push işlemlerini yapıyoruz.

### Taps Server Oluşturma

Terminali açıp aşağıdaki kodu çalıştırdığımızda server başlamış oluyor.

`taps server postgres://dbuser:dbpassword@localhost/dbname httpuser httppassword`

### Taps Client Oluşturma

Başka bir terminal açıp aşağıdaki kodu çalıştırdığımızda MySQL veritabanındaki verileri PostgreSQL' e aktarmaya başlıyoruz.

`taps push mysql2://dbuser:dbpassword@localhost/dbname http://httpuser:httppassword@example.com:5000`

* * *

*   `push` yerine `pull` kullanırsak Server olan veritabanındaki verileri Client veritabanına almış oluruz.

*   Hangi veritabanı ile işlem yapacaksak o veritabanı adaptör geminin kurulu olması gerekmektedir. PostgreSQL için `pg` MySQL için `mysql2` gibi.

*   Client' taki httpuser httppassword server ile aynı olmalıdır.

İyi çalışmalar dilerim.

 [1]: https://github.com/ricardochimal/taps/
 [2]: https://github.com/ddollar/valkyrie

[Muhammet DİLEK](http://twitter.com/muhammetdilek)

