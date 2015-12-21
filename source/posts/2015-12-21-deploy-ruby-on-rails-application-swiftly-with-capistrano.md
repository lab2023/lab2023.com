---
title: Deploy Ruby on Rails Application Swiftly With Capistrano 3
date: 2015-12-21
author: isoakbudak
tags: ruby, rails, server, client, cap, capistrano, ssh, bash, script, ruby on rails, capistrano 3, web, cybele, deploy, shell, ubuntu, vps, rbenv, en
---

Hi everybody,

In this post, I will talk about the  <a href="https://github.com/capistrano/capistrano" target="_blank">Capistrano</a>  deploy tool on Ruby On Rails and I will share some code blocks that is a bash script for to start the server from zero level. I am using Ubuntu-14.04 server. Capistrano version is 3.4. Ruby version on my server is 2.2.3. Capistrano is a open source project, if you want to look the source code of it you can visit the <a href="https://github.com/capistrano/capistrano" target="_blank">github</a> page. I am using <a href="https://www.digitalocean.com/pricing/" target="_blank">DigitalOcean</a> for server.  The servers that are price $10  are enough to run Ruby On Rails application. You can prepare your server within 2-3 hours w<span id="result_box" class="short_text" lang="en"><span class="hps">ith</span> <span class="hps">the following bash</span> <span class="hps">scripts. Those bash scripts prepare basic environment for ruby libraries and create deploy user for to use on deployment process.  Also one of them prepares ruby environment under the deploy(default deploy user name you can change it  before to run scripts) user home folder.</span></span>

![Digital Ocean](../assets/images/articles/2015-12-21-ruby-on-rails-digital-ocean.png)

&nbsp;

Base installation bash script for ruby environment is as follows. You must run this script as a root user.

<script src="https://gist.github.com/ismailakbudak/6e42120bc86b20b7dc15.js"></script>  Deploy user creating script is as follows. You must run this script as a root user too. <script src="https://gist.github.com/ismailakbudak/e2cbcd17c54967b9b387.js"></script>

&nbsp;

This script  is preparing ruby environment for deploy user. You should run this script as a deploy user.

<script src="https://gist.github.com/ismailakbudak/9fb946df9f6ec469c7db.js"></script>

&nbsp;

Your server is ready to run Ruby On Rails application  with those scripts.

Now I will talk about deployment process for simple application.
<a href="https://en.wikipedia.org/wiki/Ruby_on_Rails" target="_blank">Ruby On Rails</a> as you know written with ruby programming language,  developing with <a href="https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller" target="_blank">MVC(Model-View-Controller)</a> open source web framework and it includes principles like <a href="https://en.wikipedia.org/wiki/Don't_repeat_yourself" target="_blank">DRY(Don't Repeat Yourself)</a>, <a href="https://en.wikipedia.org/wiki/Convention_over_configuration" target="_blank">CoC(Convetion over configuration)</a> .

If you want to create rails application with swiftly, you should look the <a href="https://rubygems.org/gems/cybele" target="_blank">Cybele</a> ruby gem. This gem provides useful gem list and creates same pages for using in every application like user register, user login, update login and profile info, admin login. Thus you don't repeat yourself on every new project. You can look the template Gemfile of Cybele gem from <a href="https://github.com/lab2023/cybele/blob/develop/templates/cybele_Gemfile">github</a> account.  Some useful deploy gems are on this file.
If you create project  <code>rails new project_name</code>  command or if you want to deploy project that is already initialized, my deploy commands is in this <a href="https://github.com/lab2023/recipes_matic">recipes_matic</a> gem, you should look that.

I will show deploy steps using with cybele gem.
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

Example deploy.rb file under project config directory
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

I hope it is a useful post for you.

See you next post..