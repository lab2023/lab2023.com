---
title: database.yml ve ortak çalışma problemi
date: 2013-06-05
author: baygunm
tags: database.yml, tr
---

Merhabalar,

Herkesin lokaldeki şifreleri farklı olduğundan database.yml gibi veritabanı şifreleri bulunan dosyaları commit, push, pull etmekte sıkıntılar çıkıyor. Veritabanı yapılandırması için aşağıdaki gibi kullanıldığında, farklı kişiler projeyi kendi çalışma ortamlarına çekince sorun çıkmıyor.

Örnek postgresql içindir.

```ruby
APP_NAME: Uygulama ismi

development: &default
  adapter: postgresql
  database: APP_NAME_development
  encoding: utf8
  min_messages: warning
  pool: 5
  timeout: 5000
  host: localhost
  port: 5432

test:
  <<: *default
  database: APP_NAME_test
```

Saygılarımla,
İyi çalışmalar.
