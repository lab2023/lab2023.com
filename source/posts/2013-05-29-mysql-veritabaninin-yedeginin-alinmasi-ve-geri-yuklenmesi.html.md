---
title: MySQL Veritabanının Yedeğinin Alınması ve Geri Yüklenmesi
date: 2013-05-29 12:02 UTC
tags: backup, mysql, mysqldump, restore
---

Bu yazımızda kısa kısa MySQL veritabanını yedek almak ve geri yüklemek için aşağıdaki komutları kullanıyoruz.

**Tek bir veritabanının yedeğini alma**

    mysqldump -u root -p[root_password] [database_name] > dumpfilename.sql
    mysql -u root -p[root_password] [database_name] < dumpfilename.sql


**Bütün veritabanınlarının yedeğini alma**

    mysqldump -u root -ptmppassword --all-databases > /tmp/all-database.sql


**Veritabanında tek bir tablonun yedeğini alma**

    mysqldump -u root -ptmppassword database_nama table_name > /tmp/dumpfilename.sql


**Veritabanını restore etme**

    mysql -u root -ptmppassword

    mysql> create database sugarcrm;
    Query OK, 1 row affected (0.02 sec)

    mysql -u root -ptmppassword sugarcrm < /tmp/sugarcrm.sql

    mysql -u root -p[root_password] [database_name] < dumpfilename.sql

[Onur Özgür ÖZKAN](http://twitter.com/onurozgurozkan)

