---
title: Capistrano ile Multistage Deploy
date: 2013-09-10
twitter: dilekmuhammet
tags:
  - capistrano
  - deploy
  - ruby on rails
---

Ürünlerimizi geliştirme aşamasında production ve staging olarak iki sunucuya deploy ediyoruz. Hafta bitiminde yaptığımız işleri staging sunucusuna deploy edip test edilmesini bekliyoruz. Onay geldiğinde ise production sunucusuna gönderiyoruz.

Deploy işlermlerinde bildiğiniz gibi capistrano kullanıyoruz. İşlemleri halihazırda capistrano kullandığınızı düşünerek anlatacağım.

`config/deploy.rb` ye capistrano multistage extension ekliyoruz.

    # config/deploy.rb
    require 'capistrano/ext/multistage'


ve hangi stage ler olacağını belirtiyoruz

    # config/deploy.rb
    set :stages, %w(staging production)


config altına deploy adında bir klasör oluşturup içerisine `production.rb` ve `staging.rb` dosyalarını oluşturuyoruz.

    # config/deploy/staging.rb
    server "156.0.0.0", :web, :app, :db, primary: true
    set :port, 1234
    set :rails_env, 'staging'

    namespace :deploy do
      task :setup_config, roles: :app do
        # Staging
        sudo "ln -nfs #{current_path}/config/nginx.conf /etc/nginx/sites-enabled/#{application}"

        sudo "ln -nfs #{current_path}/config/unicorn_init_#{rails_env}.sh /etc/init.d/unicorn_#{application}"
      end
    end

    # config/deploy/production.rb
    server "156.0.0.0", :web, :app, :db, primary: true
    set :port, 1234
    set :rails_env, 'production'

    namespace :deploy do
      task :setup_config, roles: :app do
        # Production
        sudo "ln -nfs #{current_path}/config/nginx-ssl.conf /etc/nginx/sites-enabled/#{application}"

        sudo "ln -nfs #{current_path}/config/unicorn_init_#{rails_env}.sh /etc/init.d/unicorn_#{application}"
      end
    end


Kodlardan da anlaşılacağı gibi birbirinden farklı olacak şeyleri ayrı dosyalara taşıdık. Ortak olanlar ise `deploy.rb` de kalıyor.

Deploy kodunuda şu şekilde çalıştırıyoruz.

    cap production deploy
    cap staging deploy


veya

    # config/deploy.rb
    set :default_stage, "staging"


default stage belirtip

    cap deploy


yapıyoruz.

Kolaylıklar dilerim.
