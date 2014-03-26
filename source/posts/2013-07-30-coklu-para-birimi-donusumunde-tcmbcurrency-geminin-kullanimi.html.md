---
title: Çoklu Para Birimi Dönüşümünde TcmbCurrency Geminin Kullanımı
date: 2013-07-30
author: hamitturkukaya
tags: currency
---

Rails'da Çoklu para birimi dönüşümü (Multi Currency) için geliştirilmiş olan [money gem][1] ve [money-rails gem][2]'i ni kullanırken geçmişe yönelik dönüşüm yapma sıkıntısı ve oranları **Türkiye Cumhuriyeti Merkez Bankası**'ndan kur almak amacıyla [google-currency gem][3]'ini uyarlanmıştır. Bu gem ile Merkez Bankası'ndaki 20'ye yakın para birimi ile dönüşümü [Money][1] gemi altyapısıyla kullanabilirsiniz.

Öncelikle gemfile'ımıza **money-rails** ve **tcmb_currency** gemlerini ekliyoruz

    gem 'money-rails'
    gem 'tcmb_currency', :git => 'git://github.com/lab2023/tcmb_currency.git


ve ardından *bundle install* komutunu çalıştırarak gemleri projeye dahil ediyoruz. Gemler yüklenip, projeye dahil edildikten sonra terminalden

    $ rails g tcmb_currency:initializer
    $ rails g tcmb_currency:migration
    $ rake db:migrate


komutlarını çalıştırıp initializer dosyasını ve database tablolarını oluşturuyoruz. <!-- more --> Son olarak ise

    $ rake tcmb_currency:insert_from_tcmb


rake task'ını günlük olarak çalışacak bir cron job a atayarak (bu iş için [whenever gem][4] kullanılabilir), günlük olarak oranların database'e eklenmesi sağlanır

Ardından tek yapılması gereken money gemi işlemleri cent,kuruş vb. bazlı yaptığı için modelinize *monetize :price_cents* eklemek.

    class Product < ActiveRecord::Base
        attr_accessible :price, :product ,:price_cents, :price_currency
        monetize :price_cents
    end


Artık view katmanında

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


şeklinde kullanabilirsiniz

    Money.new(1000,"USD").exchange_to(:EUR) # O güne ait oranlara göre dönüşüm yapar
    Money.new(1000,"USD").exchange_to(:EUR, "2013-03-02") # Verilen tarihe ait oranlara göre dönüşüm yapar

 [1]: https://github.com/RubyMoney/money
 [2]: https://github.com/RubyMoney/money-rails
 [3]: https://github.com/RubyMoney/google_currency
 [4]: https://github.com/javan/whenever
