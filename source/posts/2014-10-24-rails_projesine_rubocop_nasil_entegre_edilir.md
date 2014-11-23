---
title: Rails Projesine Rubocop Nasıl Entegre Edilir ?
date: 2014-10-24
author: leylakapi
tags: rails, ruby, rubocop, built, error, yml, tr 
---

Elinizde bir rails projesi var ve gelişigüzel kodluyorsanız, ancak kod kalitesinden de ödün vermemek gerekir diye
düşünüyorsanız `rubocop` bu aşamada size yardımcı olacaktır.

**Rubocop**, ruby kodlarının [ruby stil rehberi](https://github.com/bbatsov/ruby-style-guide) standartlarına göre tarayıp
kodlarınızdaki hataları ve hatalara neden olacak kod parçacıklarınızın göstererek gerektiğinde çözmenizi sağlayan bir
kod analiz aracıdır. Rubocop ile kod kaliteniz artar, daha temiz ve daha profesyonel kod yazmaya başlarsınız.

Rubocop kurulumuna ve kullanımına başlamadan önce, var olan rails projenizin `git` veya türevlerinden herhangi biri ile
paketlenmis olduğuna dikkat etmeniz
gerekmektedir. Sonrasında rubocop'u rails projenize entegre etmek için aşağıdaki işlemleri sırasıyla yapmalısınız,

- Rails projenizde var olan `Gemfile` açıp içine aşağıdaki `gem` 'leri eklemeniz gerekmektedir,

```ruby
group :development do
  gem 'rubocop', require: false
  gem 'haml-lint', require: false
end
```

`bundle` komutu koşulduktan sonra, `rubocop` çalışma mantığını görme amaçlı terminalinizden,
  
```bash
$ rubocop -RD  
```  

komutunu koşabilirsiniz.

- Entegre işlemine devam edecek olursak, Rails projenizin kök dizinine `.rubocop.yml` adında bir dosya oluşturmanız gerekmektedir. 
Ardından terminalde aşağıdaki komutu koşabilirsiniz;

```bash
$ rubocop --auto-gen-config
```

komutu ile kök dizininde `.rubocop-todo.yml` adında bir dosya oluşturmaktadır. **.rubocop-todo.yml**,  projenizde var olan hataların kontrollerini ve sayılarını içeren bir liste sunmaktadır.  
Ek olarak `Ubuntu` bilgisayar kullanıyorsanız yukardaki komut ile birlikte ;

```bash
$ rubocop --config .rubocop_todo.yml
```
komutunu koşmanız gerekmektedir.

- Ardından oluşturduğumuz `.rubocop.yml` dosyasını içine hangi dosyaları include etmek istiyorsak( veya tam terside dogru ),

```yml
AllCops:
  Include:
    - Rakefile
    - config.ru
  Exclude:
    - db/schema.rb
```

şeklinde belirtiyoruz. Ancak eğer var olan dosyalar için işlem yapmak istiyorsanız `.rubocop.yml` dosyasını oluşturmadan da  
yukarıdaki komutları koşup rubocop'u rails projenize entegre edebilrsiniz.

Ek olarak rubocop entegre edildikten sonra projeniz için,

```bash
$ rubocop
```

yerine

```bash
$ rubocop -R
```

Komutunu koşmanız size daha detaylı bir liste verecektir.

Detaylı bilgi için [Rubocop Github Sayfası](https://github.com/bbatsov/rubocop) yardımcı olacaktır.
