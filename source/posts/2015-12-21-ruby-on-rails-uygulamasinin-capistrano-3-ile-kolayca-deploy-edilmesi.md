---
title: Ruby on Rails Uygulamasının Capistrano 3 ile Kolayca Deploy Edilmesi
date: 2015-12-21
author: isoakbudak
tags: ruby, rails, sunucu, server, client, cap, capistrano, ssh, bash, script, ruby on rails, capistrano 3, Web, cybele, deploy, shell, ubuntu, tr
---

Merhaba arkadaşlar,
Sizlere Ubuntu-14.04 sunucusunu sıfırdan ayağa kaldırıp, kendi rails uygulamalarınızı sunucuya hızlı bir şekilde aktarabileceğiniz <a href="https://github.com/capistrano/capistrano" target="_blank">Capistrano</a> uygulamasından bahsedeceğim ve bazı kaynak kodlar paylaşacağım. Kullandığım capistrano'nun versiyonu 3.4'tür. Sunucu üzerinde kullandığım ruby versiyonu ise 2.2.3'tür. Capistrano'nun kaynak kodlarına <a href="https://github.com/capistrano/capistrano" target="_blank">github</a> adresinden erişip göz atabilirsiniz.  Ben kendi uygulamalarımda sunucu olarak <a href="https://www.digitalocean.com/pricing/" target="_blank">DigitalOcean</a> kullanıyorum. DigitalOcean'dan alacağınız 10 $'lık bir sunucuyu aşşağıda vereceğim bash scriptleri ile 2-3 saat içinde ayağa kaldırıp Nginx, Postgresql, Unicorn ayarlarını yaparak çalışır hale getirebilirsiniz.

Şimdi izliyeceğimiz adımlar gelecek olursak, öncelikle DigitalOcean'dan yeni bir Droplet oluşturuyoruz ve dağıtım olarak Ubuntu 14.04 seçiyoruz.

![Digital Ocean](../assets/images/articles/2015-12-21-ruby-on-rails-digital-ocean.png)

&nbsp;

Sunucuda ruby ortamı için temel kurulum scripti aşağıdaki gibidir. Bu script root kullanıcısı olarak bağlanıp çalıştırmalısınız.

<script src="https://gist.github.com/ismailakbudak/6e42120bc86b20b7dc15.js"></script>  Sunucuda deploy kullanıcısı için kurulum scripti aşağıdaki gibidir. Bu script'ide root kullanıcısı olarak bağlanıp çalıştırmalısınız.<script src="https://gist.github.com/ismailakbudak/e2cbcd17c54967b9b387.js"></script>

&nbsp;

Sunucuda deploy kullanıcısı için ruby ortamını hazırlama scripti aşağıdaki gibidir. Bu script deploy kullanıcısı olarak bağlanıp çalıştırmalısınız.

<script src="https://gist.github.com/ismailakbudak/9fb946df9f6ec469c7db.js"></script>

&nbsp;

Bu scriptler ile sunucunuzu bir rails uygulamasını çalıştıracak duruma getirmiş olursunuz.

Şimdi bir rails uygulaması oluşturup, uygulamayı bir sunucuya aktarma işlemlerini anlatacağım.
<a href="https://en.wikipedia.org/wiki/Ruby_on_Rails" target="_blank">Ruby On Rails</a> bildiğiniz ruby dili ile, <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC(Model-View-Controller)</a> mimari deseni ile geliştirilmiş ve bünyesinde <a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself" target="_blank">DRY(Don't Repeat Yourself)</a>, <a href="https://en.wikipedia.org/wiki/Convention_over_configuration" target="_blank">CoC(Convetion over configuration)</a> gibi yazılım felsefelerini barındıran açık kaynak bir uygulama çatısıdır.

Hızlı bir Ruby On Rails uygulaması çıkarmak istiyorsanız size <a href="https://rubygems.org/gems/cybele" target="_blank">Cybele</a> ruby gem'ini öneririm. Bu gem bir uygulamada olması gereken kullanıcı giriş, bilgi güncelleme, yönetici tarafına giriş işlemleri gibi her projede kullanacağınız kısımlar hazır bir taslak olarak geliyor. Bu sayede önceden yazdığınız kodları tekrar yazmak zorunda kalmıyorsunuz. Cybele geminin taslak olarak getirdiği Gemfile'ı <a href="https://github.com/lab2023/cybele/blob/develop/templates/cybele_Gemfile">github</a> adresinden inceleyebilirsiniz. Sunucuya kolay bir şekilde uygulamayı taşımak için kullancağımız gemler bu Gemfile'da yer almaktadır.
Eğer <code> rails new project_name</code> şeklinde sıfırdan bir proje oluşturursanız veya halihazırda bulunan bir projenizi sunucuya taşımak isterseniz, kullanacağım komutlar dizisinin yer aldığı <a href="https://github.com/lab2023/recipes_matic">recipes_matic</a> gemini incelemenizi tavsiye ederim.

Ben cybele ile oluşturduğumuz bir proje için bu adımları anlataçağım.
<ol>
	<li>Proje oluştur <code>$ cybele project_name</code></li>
	<li>Deploy repo bilgilerini düzenle <code>/config/deploy.rb</code>
<pre> set :repo_url, 'git@github.com:your_username/your_repo_name.git'</pre>
</li>
	<li>Production deploy bilgilerini düzenle <code> /config/deploy/production.rb </code>
<pre>
server "example.com", user: "#{fetch(:local_user)}", roles: %w{app db web}, primary: true, port: 22
set :rails_env, 'production'
set :branch, 'master'
set :project_domain, “example.com”
</pre>
</li>
	<li>Staging deploy bilgilerini düzenle <code>/config/deploy/staging.rb</code>
<pre>
server "staging.example.com", user: "#{fetch(:local_user)}", roles: %w{app db web}, primary: true, port: 22
set :rails_env, 'staging'
set :branch, 'develop'
set :project_domain, “staging.example.com”
</pre>
</li>
	<li>Hata bildirimleri için email adresini düzenle
 <br/> <code>config/environments/production.rb </code><br/> <code>config/environments/staging.rb</code>
<pre>config.middleware.use ExceptionNotification::Rack,
:email =&gt; {
  :email_prefix =&gt; "[project_name]",
  :sender_address =&gt; %{"Notifier" &lt;notifier@project_name.com&gt;},
  :exception_recipients =&gt; %w{your_email@address.com}
}
</pre>
</li>
	<li>Aşağıdaki dosyalarda SMTP ayarlarını ayarla <br/><code>config/settings/staging.yml</code><br/><code>config/settings/production.yml</code></li>
	<li>Github da bulunan private repolara lokaldeki gibi erismek icin şu komutları çalıştır
            <br/><code>$ eval `ssh-agent -s`</code> <br/><code>$ ssh-add </code></li>
	<li>Gelelim terminalden çalıştırmamız gereken komutlar dizisine,Production sunucusunda ki deploy ortamının hazır olup olmadığını kontrol eder.
<code>$ bundle exec cap production deploy:check</code>
Production sunucusunda nginx, postgresql, unicorn, <a href="http://meskyanichi.github.io/backup/v3/">backup</a>(veritabanı yedek alma gemi) gibi ayarları yapar.
<code>$ bundle exec cap production deploy:prepare</code>
Production sunucusuna deploy işlemini gerçekleştirir.
<code>$ bundle exec cap production deploy</code></li>
</ol>
&nbsp;

Örnek dosyalarımızda şu şekilde olmalıdır.
Proje anadizininde bulunan Capfile örneği:
<pre>
# Load DSL and set up stages
require 'capistrano/setup'

# Include default deployment tasks
require 'capistrano/deploy'
require 'capistrano/rails'
require 'capistrano/bundler'
require 'sshkit/sudo'
require 'capistrano/maintenance'

# Include tasks from other gems included in your Gemfile
#
# For documentation on these, see for example:
#
#   https://github.com/capistrano/rvm
#   https://github.com/capistrano/rbenv
#   https://github.com/capistrano/chruby
#   https://github.com/capistrano/bundler
#   https://github.com/capistrano/rails
#   https://github.com/capistrano/passenger
#
# require 'capistrano/rvm'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
# require 'capistrano/bundler'
# require 'capistrano/rails/assets'
# require 'capistrano/rails/migrations'
# require 'capistrano/passenger'

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }

</pre>

Proje config dizininde bulunan deploy.rb örneği:
<pre>
# config valid only for current version of Capistrano
lock '3.4.0'

set :application, 'appname'
set :local_user, 'deploy'
set :stages, %w(staging production)
set :default_stage, 'production'
set :repo_url, "git@github.com:username/#{fetch(:application)}.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/blog2
set :deploy_to, "/home/#{fetch(:local_user)}/apps/#{fetch(:application)}"

# Default value for :scm is :git
set :scm, :git

# Default value for :format is :pretty
# set :format, :pretty

# Default value for :log_level is :debug
# set :log_level, :debug

# Default value for :pty is false
set :pty, true

# Default value for :linked_files is []
set :linked_files, fetch(:linked_files, []).push('config/database.yml')

# Default value for linked_dirs is []
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/upload', 'public/images', 'public/seat_images')

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }
set :default_env, { path: '$HOME/.rbenv/shims:$HOME/.rbenv/bin:$PATH' }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Look our recipes
# https://github.com/lab2023/recipes_matic
load 'config/deploy/recipes/base.rb'

</pre>

Umarım faydalı bir yazı olmuştur.
Kolay gelsin..