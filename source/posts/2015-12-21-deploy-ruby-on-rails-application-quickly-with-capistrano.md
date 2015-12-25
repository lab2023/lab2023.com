---
title: Deploy Ruby on Rails Application Quickly With Capistrano 3
date: 2015-12-21
author: isoakbudak
tags: ruby, rails, server, client, cap, capistrano, ssh, bash, script, ruby on rails, capistrano 3, web, cybele, deploy, shell, ubuntu, vps, rbenv, en
---

Hi,

In this post, We will write about the  <a href="https://github.com/capistrano/capistrano" target="_blank">Capistrano</a>  deploy tool on `Ruby On Rails(ROR)` and We will share some code blocks
that is a bash script for starting the server from beginning. We are using Ubuntu-14.04 server. Capistrano version is 3.4. Ruby version on our server is 2.2.3. Capistrano is an open source project,
if you want to look the source code, you can visit the <a href="https://github.com/capistrano/capistrano" target="_blank">github</a> page.
For example you can use [Netinternet](http://www.netinternet.com.tr/panel/aff.php?aff=916) or [DigitalOcean](https://www.digitalocean.com/) server suppliers. You can prepare your server within 2-3 hours w<span id="result_box" class="short_text" lang="en"><span class="hps">ith</span> <span class="hps">the following bash</span> <span class="hps">scripts.
Those bash scripts prepare basic environment for Ruby libraries and create `deploy user` for using on deployment process.  Also one of them prepares Ruby environment under the `deploy user` home folder(default `deploy user` name you can change it  before to run scripts)</span></span> .

Base installation bash script for Ruby environment is as follows. You must run this script as a root user.

```bash
## Run this script with root user
## Fancy echo
fancy_echo() {
  printf "\n%b\n" "$1"
}
fancy_echo "Updating system packages ..."
apt-get -y update
apt-get -y upgrade
fancy_echo "Installing python-software-properties..."
apt-get -y install python-software-properties
fancy_echo "Installing software-properties-common..."
apt-get -y install software-properties-common
fancy_echo "Exporting language"
export LANGUAGE=en_US.UTF-8 && export LANG=en_US.UTF-8 && export LC_ALL=en_US.UTF-8 && locale-gen en_US.UTF-8 && dpkg-reconfigure locales
fancy_echo "Installing libraries for common gem dependencies ..."
apt-get -y install autoconf bison build-essential libssl-dev libyaml-dev libreadline6-dev zlib1g-dev libncurses5-dev libffi-dev libgdbm3 libgdbm-dev
apt-get install git-core openssl curl libreadline-dev libxslt1-dev libcurl4-openssl-dev ruby-dev make make-doc
fancy_echo "Installing nodejs ..."
add-apt-repository -y ppa:chris-lea/node.js
apt-get -y update
apt-get -y install nodejs
apt-get -y install libxslt-dev libxml2-dev
fancy_echo "Installing imagemagick ..."
apt-get install -y imagemagick
fancy_echo "Installing nginx ..."
add-apt-repository -y ppa:nginx/stable
apt-get -y update
apt-get -y install nginx
service nginx start
fancy_echo "Installing postgresql ..."
apt-get -y install postgresql libpq-dev
```


Deploy user creating script is as follows. You must run this script as a root user too.


```bash
# Deploy group
deploy_group=deploy
# Deploy user
deploy_user=deploy
# Github usernames for access with ssh to deploy user
usernames=(tayfunoziserikan ismailakbudak)
# Check user is exist
id -u $deploy_user &> /dev/null
if [ $? -ne 0 ]
then
  echo "* Add $deploy_group group"
  groupadd $deploy_group
  echo "* Creating user $deploy_user"
  useradd -m -g $deploy_group -s /bin/bash $deploy_user
  echo "* Adding user $deploy_user to sudoers"
  chmod +w /etc/sudoers
  echo "$deploy_user ALL=(ALL) ALL" >> /etc/sudoers
  chmod -w /etc/sudoers
else
  echo "* $deploy_user user already exists"
fi
# Check user is exist, maybe some errors occured
id -u $deploy_user &> /dev/null
if [ $? -ne 0 ]
then
  echo "* $deploy_user user does not exists"
else
  # Prepare ssh keys environment
  echo "* Add .ssh directory to $deploy_user"
  test -d /home/$deploy_user/.ssh
  if [ $? -ne 0 ]
  then
    mkdir /home/$deploy_user/.ssh
    # change user permisisions
    # 700 => (owner read/write/execute, group none, other none)
    chmod 700 /home/$deploy_user/.ssh
    chown $deploy_user /home/$deploy_user/.ssh
    chgrp $deploy_group /home/$deploy_user/.ssh
  fi
  echo "* Get usernames public keys from GitHub and add them to $deploy_user authorized_keys"
  for username in ${usernames[@]}; do
    name=$username.keys
    wget https://github.com/$name --no-check-certificate -O $name
    cat $name >> /home/$deploy_user/.ssh/authorized_keys
    rm $name # remove temprory file
  done
  # change user permisisions
  # 600 => (owner read/write, group none, other none)
  chmod 600 /home/$deploy_user/.ssh/authorized_keys
  chown $deploy_user /home/$deploy_user/.ssh/authorized_keys
  chgrp $deploy_group /home/$deploy_user/.ssh/authorized_keys
  echo "* Completed..."
fi
```


&nbsp;

This script  is preparing ruby environment for `deploy user`. You should run this script as a `deploy user`.

```bash
## Run this command with deploy user
# define user home path
user_path=/home/deploy
## Fancy echo
fancy_echo() {
  printf "\n%b\n" "$1"
}
fancy_echo "Installing rbenv..."
git clone git://github.com/sstephenson/rbenv.git $user_path/.rbenv
fancy_echo "Writing rbenv path to bashrc ..."
echo 'export PATH=\"$HOME/.rbenv/bin:$PATH\"' >> $user_path/.bashrc
echo 'eval "$(rbenv init -)"' >> $user_path/.bashrc
fancy_echo "Exporting rbenv path..."
export PATH="$HOME/.rbenv/bin:$PATH"
eval "$(rbenv init -)"
fancy_echo "Preparing rbenv plugins..."
mkdir -p $user_path/.rbenv/plugins
git clone https://github.com/sstephenson/ruby-build.git $user_path/.rbenv/plugins/ruby-build
echo 'export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"' >> $user_path/.bashrc
git clone https://github.com/sstephenson/rbenv-gem-rehash.git $user_path/.rbenv/plugins/rbenv-gem-rehash
## Ruby environment
RUBY_VERSION="2.2.3"
fancy_echo "Installing Ruby $RUBY_VERSION ..."
rbenv install $RUBY_VERSION
rbenv rehash
rbenv global $RUBY_VERSION
ruby -v
fancy_echo "Gem update system ..."
gem update --system
fancy_echo "Echo .gemrc..."
echo 'gem: --no-rdoc --no-ri' >> $user_path/.gemrc
gem install bundler
gem install backup
rbenv rehash
fancy_echo "Export path ..."
echo "export PATH="$PATH:/usr/bin"" >> $user_path/.bashrc
exec $SHELL
```

&nbsp;

Your server is ready to run ROR application  with those scripts.

Now We will write about deployment process for simple application.
As you know <a href="https://en.wikipedia.org/wiki/Ruby_on_Rails" target="_blank">ROR</a> has been developed with Ruby programming language,  developing with <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC(Model-View-Controller)</a> open source web framework and it includes principles like <a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself" target="_blank">DRY(Don't Repeat Yourself)</a>, <a href="https://en.wikipedia.org/wiki/Convention_over_configuration" target="_blank">CoC(Convetion over configuration)</a> .

If you want to create rails application quickly, you should look the <a href="https://rubygems.org/gems/cybele" target="_blank">Cybele Ruby Gem</a> . This gem provides useful gem list and creates common pages for using in every application like user register, user login, update login and profile info, admin login. Thus you don't repeat yourself on every new project. You can look the template Gemfile of Cybele gem, also from <a href="https://github.com/lab2023/cybele/blob/develop/templates/cybele_Gemfile">github</a>.  Some useful deploy gems are on this file.
If you create project  <code>rails new project_name</code>  command or if you want to deploy project that is already initialized, my deploy commands is in this <a href="https://github.com/lab2023/recipes_matic">recipes_matic</a> gem, you should look that.

We will show deploy steps using with cybele gem.
<ol>
	<li>Create project <code>$ cybele project_name</code></li>
	<li>Edit deploy repo on this file <code>/config/deploy.rb</code>
<pre> set :repo_url, 'git@github.com:your_username/your_repo_name.git'</pre>
</li>
	<li>Edit production deploy settings on this file <code> /config/deploy/production.rb </code>
<pre>
server "example.com", user: "#{fetch(:local_user)}", roles: %w{app db web}, primary: true, port: 22
set :rails_env, 'production'
set :branch, 'master'
set :project_domain, “example.com”
</pre>
</li>
	<li>Edit staging deploy settings on this file <code>/config/deploy/staging.rb</code>
<pre>
server "staging.example.com", user: "#{fetch(:local_user)}", roles: %w{app db web}, primary: true, port: 22
set :rails_env, 'staging'
set :branch, 'develop'
set :project_domain, “staging.example.com”
</pre>
</li>
	<li> Edit your_email address for to get info about the occurred errors
<br/><code>config/environments/production.rb </code><br/> <code>config/environments/staging.rb</code>
<pre>config.middleware.use ExceptionNotification::Rack,
:email =&gt; {
  :email_prefix =&gt; "[project_name]",
  :sender_address =&gt; %{"Notifier" &lt;notifier@project_name.com&gt;},
  :exception_recipients =&gt; %w{your_email@address.com}
}
</pre>
</li>
	<li>Edit yout SMTP settings on those files <br/><code>config/settings/staging.yml</code><br/> <code>config/settings/production.yml</code></li>
	<li>If you have private repo on github, run this commands in order for to access repo from server <br/><code>$ eval `ssh-agent -s`</code><br/> <code>$ ssh-add </code></li>
	<li>Let's deploy our application with capistrano,
Check production server is ready to deployment
<code>$ bundle exec cap production deploy:check</code>
Setup nginx, postgresql, unicorn, <a href="http://meskyanichi.github.io/backup/v3/">backup</a>(backup gem for to get database backup before deploy) for production server.
<code>$ bundle exec cap production deploy:prepare</code>
Do deploy to production server.
<code>$ bundle exec cap production deploy</code></li>
</ol>
&nbsp;

Example Capfile file under project root directory

```rb
# Load DSL and set up stages
require 'capistrano/setup'
# Include default deployment tasks
require 'capistrano/deploy'
require 'capistrano/rails'
require 'capistrano/bundler'
require 'sshkit/sudo'
require 'capistrano/maintenance'
# Include tasks from other gems included in your Gemfile
# For documentation on these, see for example:
#   https://github.com/capistrano/rvm
#   https://github.com/capistrano/rbenv
#   https://github.com/capistrano/chruby
#   https://github.com/capistrano/bundler
#   https://github.com/capistrano/rails
#   https://github.com/capistrano/passenger
# require 'capistrano/rvm'
# require 'capistrano/rbenv'
# require 'capistrano/chruby'
# require 'capistrano/bundler'
# require 'capistrano/rails/assets'
# require 'capistrano/rails/migrations'
# require 'capistrano/passenger'
# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob('lib/capistrano/tasks/*.rake').each { |r| import r }
```


Example deploy.rb file under project config directory

```rb
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
```

We hope it is a useful post for you.

