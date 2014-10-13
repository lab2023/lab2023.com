---
title: What is the vagrant and properties of vagrant ?
date: 2014-10-13 
author: leylakapi
tags: vagrant, virtual-machine, virtual-box, ssh, script, shell, en
---

### Properties of Vagrant

`Vagrant` is a application which improved your application in virtual machine, this means that, 
you can create your project environment on virtual machine. Thanks to vagrant, you cloned local environment on virtual machine. 
So, when you sent to your project to `server`, you can't see any bug or error on your server.
On the other hand vagrant is useful, while you are working in a team.

### How to Set Up Vagrant on Ubuntu Desktop?

For the install and use vagrant, you should follow below steps respectively.

Let's look, how to set up and use `Vagrant in Ubuntu desktop`,

- Install Vagrant
- Create Vagrant Folders
- Install Precise32 Box
- Set up new Virtual Machine
- Install Virtual Machine configuration

### 1) Install Vagrant

For the install vagrant on your Ubuntu desktop is very easy. Open your terminal and write below command.

```bash
$ sudo apt-get install vagrant
...
```

### 2) Create Vagrant Folder

Continue on terminal, write below commands,

```bash
$ mkdir Vagrant
$ mkdir Vagrant/Projects
$ mkdir Vagrant/Projects/VM_169.x
```

### 3) Install Precise32 Box

Precise32 box is important on ubuntu desktop, because thanks to this box you can modify your virtual machine.
 
```bash
$ cd Vagrant/Projects/VM_169.x
$ vagrant box add precise32 http://files.vagrantup.com/precise32.box --provider virtualbox
...
```

After install, you can check with,

```bash
$ vagrant box list
precise32 (virtualbox, 0)
```

### 4) Create New Virtual Machine

For create new virtual machine, you should initialize precise32 box,

```bash
$ vagrant init precise32
```
When you wrote above command, you get warning about it, this means include `Vagrantfile`.

### 5) Install Virtual Machine configuration

```bash
$ wget https://raw.github.com/saasbook/courseware/master/vm-setup/configure-image-0.10.3.sh
```
You should configure permission for virtual machine configuration

```bash
$ chmod +x configure-image-0.10.3.sh
```
- Run the virtual machine with 

```bash
$ vagrant up
```

- Connecting with virtual machine
 
```bash
$ vagrant ssh
Welcome to Ubuntu 12.04 LTS (GNU/Linux 3.2.0-23-generic-pae i686)
 * Documentation:  https://help.ubuntu.com/
New release '14.04.1 LTS' available.
Run 'do-release-upgrade' to upgrade to it.
Welcome to your Vagrant-built virtual machine.
Last login: Sun Oct 12 09:36:51 2014 from 10.0.2.2
vagrant@precise32:~$ 
``` 

- Run virtual machine configuration, 
 
```bash
vagrant@precise32:~$ /vagrant/configure-image-0.10.3.sh
Enter password to be used for sudo commands:
``` 
you should enter a password for commands above.
 
If you finish work on virtual machine, you write below commands for exit or turn off virtual machine
 
```bash
$ vagrant suspend
$ vagrant resume
$ vagrant halt
``` 
Or if you want to remove all things from virtual machine

```bash
$ vagrant destroy
```
But for the built again to your project only below commands it's enough.

```bash
$ vagrant up
```

- When I say `Vagrant` is useful for working in a team, look [Vagrant Cloud](https://vagrantcloud.com/).

You can create account and share your vagrant environment with anyone with `vagrant cloud`.
After create your account, open your terminal,

```bash
$ vagrant login
...
```
Write email or username and password for vagrant cloud, then 

```bash
$ vagrant share
```
For more detail about Vagrant, you can look ;

- [Vagrant](http://docs.vagrantup.com/v2/getting-started/index.html) 
- [Vagrant on Ubunbtu](https://github.com/saasbook/courseware/wiki/Setting-Up-Vagrant-Environment-on-Ubuntu-Platform)

Or,

if you want read same article with details in Turkish, you can read in [this link](http://lab2023.com/vagranta-giris.html). 
 
That' s all.
