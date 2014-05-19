---
title: Katip gemi ve kullanımı
date: 2013-07-23
author: baygunm
tags: katip
---

## Katip nedir?

Katip, git üzerinden takip edilen bir projede değişiklik günlüğü oluşturmanızı sağlar.

Katip, git üzerinden versiyon etiketlerine göre gruplanmış bir şekilde değişiklik günlüğünü döker. Gem size herhangi bir git projesinde kullanabileceğiniz **katip** isminde bir çalıştırılabilir dosya da sağlar. Günlük satırları, commitlere olan bağlantıları; commit notunu ve kulanıcı adını içerir.

## Kurulum

Katip'i kurmak için

  ```
    gem install katip
  ``

bundler kullanıyorsanız Gemfile'a aşağıdaki satırları ekleyin:`

  ```
    source 'https://rubygems.org'
    gem 'katip'
  ```


## Kullanımı

### Çalıştırılabilir dosya ile kullanımı

git ile takip ettiğiniz proje dizininde **katip** yazıp çalıştırın:

  ```
    % katip
    Create CHANGELOG.md
  ```


Dosya isminizin CHANGELOG.md yerine farklı bir isimde olmasını istiyorsanız

  ```
    % katip BenimDosyam.md
    Create BenimDosyam.md
  ```


### rake olarak kullanımı

Gemfile' a gem' i ekleyin:


  ```
    source 'https://rubygems.org'
    gem 'katip'
  ```

ve sonrasında rake olarak çalıştırabilirsiniz

  ```
    % rake katip:create
    Create CHANGELOG.md
  ```


Dosya isminizin CHANGELOG.md yerine farklı bir isimde olmasını istiyorsanız

```
    % rake katip:create file=BenimDosyam.md
    Create BenimDosyam.md
```


ve işte bu kadar. Proje dizininizde, commit' lere dayanarak etiketlere göre gruplanmış şekilde günlük dosyanız hazır.

<a href="https://github.com/kebab-project/katip/blob/develop/CHANGELOG.md" target="_blank">Örnek çıktı - CHANGELOG.md</a>

#### Bağlantılar

<a href="https://github.com/kebab-project/katip" target="_blank">Kaynak kodu</a> <a href="http://github.com/kebab-project/katip/issues" target="_blank">Hata ve geri bildirimler</a>
