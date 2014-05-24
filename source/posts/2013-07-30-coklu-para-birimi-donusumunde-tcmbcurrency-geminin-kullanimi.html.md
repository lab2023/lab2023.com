---
title: Çoklu Para Birimi Dönüşümünde TcmbCurrency Geminin Kullanımı
date: 2013-07-30
author: hamitturkukaya
tags: currency, tr
---

Rails'da Çoklu para birimi dönüşümü (Multi Currency) için geliştirilmiş olan [money gem](https://github.com/RubyMoney/money) 
ve [money-rails gem](https://github.com/RubyMoney/money-rails)'i ni kullanırken geçmişe yönelik dönüşüm yapma sıkıntısı 
ve oranları **Türkiye Cumhuriyeti Merkez Bankası**'ndan kur almak amacıyla 
[google-currency gem](https://github.com/RubyMoney/google_currency)'ini uyarlanmıştır. Bu gem ile Merkez Bankası'ndaki 
20'ye yakın para birimi ile dönüşümü [Money](https://github.com/RubyMoney/money) gemi altyapısıyla kullanabilirsiniz.

Öncelikle gemfile'ımıza **money-rails** ve **tcmb_currency** gemlerini ekliyoruz

```ruby
gem 'money-rails'
gem 'tcmb_currency', :git => 'git://github.com/lab2023/tcmb_currency.git
```

ve ardından *bundle install* komutunu çalıştırarak gemleri projeye dahil ediyoruz. Gemler yüklenip, projeye dahil edildikten sonra terminalden

```bash
$ rails g tcmb_currency:initializer
$ rails g tcmb_currency:migration
$ rake db:migrate
```

komutlarını çalıştırıp initializer dosyasını ve database tablolarını oluşturuyoruz. <!-- more --> Son olarak ise

```bash
$ rake tcmb_currency:insert_from_tcmb
```

rake task'ını günlük olarak çalışacak bir cron job a atayarak (bu iş için [whenever gem](https://github.com/javan/whenever) 
kullanılabilir), günlük olarak oranların database'e eklenmesi sağlanır

Ardından tek yapılması gereken money gemi işlemleri cent,kuruş vb. bazlı yaptığı için modelinize *monetize :price_cents* 
eklemek.

```
class Product < ActiveRecord::Base
    attr_accessible :price, :product ,:price_cents, :price_currency
    monetize :price_cents
end
```

Artık view katmanında

```ruby
<% @products.each do |product| %>
    <tr>
        <td><%= product.product %></td>
        <td><% price =Money.new(product.price_cents,product.price_currency) %></td>
        <td><%= humanized_money_with_symbol price %></td>
        <td><%= humanized_money_with_symbol price.exchange_to(:JPY) %></td>
        <td><%= humanized_money_with_symbol price.exchange_to(:EUR, "2013-03-06") %></td>
        <td><%= link_to 'Show', product %></td>
        <td><%= link_to 'Edit', edit_product_path(product) %></td>
        <td><%= link_to 'Destroy', product, method: :delete, data: { confirm: 'Are you sure?' } %></td>
    </tr>
<% end %>
```

şeklinde kullanabilirsiniz

```ruby
# O güne ait oranlara göre dönüşüm yapar
Money.new(1000,"USD").exchange_to(:EUR) 
# Verilen tarihe ait oranlara göre dönüşüm yapar
Money.new(1000,"USD").exchange_to(:EUR, "2013-03-02") 
```
