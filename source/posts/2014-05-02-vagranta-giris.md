---
title: Vagrant'a Giriş
date: 2014-05-02
author: marjinal1st
tags: vagrant, virtualbox, sanallaştırma, vagrant cloud, tr
---

Vagrant nedir?

Vagrant, sanallaştırma yazılımlarını kullanarak (Virtualbox, VMWare, Hyper-V, Qemu vs.) hızlıca geliştirme ortamları kurup kullanabileceğiniz, modifiye edebileceğiniz ve bunları bulut tabanlı bir sistemde paylaşabileceğiniz bir araçtır.

Burada özellikle “hızlıca” sözcüğüne ciddi anlamda değinmek lazım. Zira konsol üstünden verilebilecek bir iki basit komut ile, anında bir işletim sistemini ayağa kaldırıp ihtiyaçlara göre düzenleyebiliyorsunuz ve kullanabiliyorsunuz.

Peki bu kimin işine yarar? Kolay bir cevap gibi gözükecek olsa da, teknik olarak IT ile uğraşan çoğu kişinin işini kolaylaştırabilir.

* Web ürünleri için hızlıca **staging** veya **production** sunucuları kurulabilir.
* Sistem yönetimi ve ağ kurulumları için hızlıca test ortamları oluşturulabilir.
* Sistem programcılığı, özellikle de çekirdek modülleri geliştirilmesi ve test ortamı için hızlıca sanal sistemler hazırlanabilir.
* Hepsinden önemlisi, fantastik bir şeyler denemek isteyen tüm geekler ve nerdler için hızlıca GNU/Linux ve BSD sistemleri kurulabilir :)

Vagrant’ın kurulumu oldukça basit. Sitesinden, işletim sisteminize ve mimarinize uygun sürümü indirip kurmanız yeterli. Bunun için ayrıca, sisteminizde bir sanallaştırma yazılımı olması gerekiyor. Standart sürümünde VirtualBox desteklendiği için sisteminize VirtualBox da kurmanız lazım. Ben şahsen bunu Crunchbang 11 AMD64 (Debian 7 Wheezy tabanlı) ve VirtualBox 4.1.18 üstünde kurdum ve kullanıyorum.

[http://www.vagrantup.com/downloads.html](http://www.vagrantup.com/downloads.html)

Vagrant eskiden RubyGems kullanıyordu. Bu yüzden internette bir çok kaynakta bu yönde kurulum ile ilgili kaynaklar vardır. Eğer sisteminizde Vagrant gem olarak bulunuyor ise aşağıdaki komut ile kaldırabilirsiniz. Konu ile ilgili daha detaylı bilgiyi [http://mitchellh.com/abandoning-rubygems](http://mitchellh.com/abandoning-rubygems) makalesinde bulabilirsiniz.

```bash
gem uninstall vagrant
```

Ardından [Vagrant Cloud](https://vagrantcloud.com/) hizmetinden bahsetmek istiyorum. Burada, sanallaştırma yazılımlarıyla oluşturulan sistem kalıp, bulut temelli bir altyapıyla internet üzerinden paylaşılabilir hale getiriliyor. Sistemin Github’a oldukça benzediğini söylemek mümkün.

Kullanmaya başlamak için bir konsol açın. Hemen bir sistem kurulumu yapmak için şu komutu verelim:

```bash
vagrant init hashicorp/precise32
```

Bu komutu verdikten sonra bulunduğunuz klasörde **Vagrantfile** adında bir dosya oluşacak. Burada kurulacak sistem için temel bilgiler ve bazı önemli yapılandırmalar bulunuyor. Şimdi ise şu komutu verelim:


```bash
vagrant up
```

Bu komutla, Vagrant Cloud’dan, **hashicorp** kullanıcısının (veya organizasyonunun, dediğim gibi Github’a çok benziyor bu sistem.) **precise32** sistem kalıbı internetten indirilecek ve kurulum yapılacak. Vagrant Cloud’dan diğer sistem kalıplarına da bakıp, farklı bir tane de kurabilirsiniz.

İnternetten indirme yapılacağı için, ilk indirme biraz uzun sürebilir fakat, sistem kalıpları bir önbellek klasöründe tutulacak. Yani sonradan aynı kalıbı kurmak isterseniz, direkt olarak bilgisayardan alıp hızlıca kuracak.

İşlem bittikten sonra sanal makina otomatik olarak başlatılacak. Kontrol etmek için şu komutu verelim:

```bash
vagrant status
```

Çıktıda **default running (virtualbox)** görüyorsak sistemimiz çalışıyor demektir. Sisteme giriş yapmak için şu komutu verelim:

```bash
vagrant ssh
```

Budur :) Kısa bir sürede, sanal bir bilgisayara Ubuntu 12.04 LTS 32 Bit kurulumu yaptık ve şimdi SSH ile sistemin içindeyiz. Hashicorp’un sistemi, hızlıca yapılandırılabilir hale getirmesinden olsa gerek, kullanıcı adı **vagrant** ve şifresi de **vagrant**. Hatta, bu kullanıcı direkt admin grubuna alınmışki, bu grup da “NOPASSWD: ALL” özelliğine sahip olduğundan hiçbir şey için şifre sorulmuyor. Vagrant’ın ayarlara doğrudan ulaşabilmesi için bunun böyle kalması gerekiyor.

SSH ile bağlı olduğumuzdan, doğrudan **exit** diyerek çıkış yapabiliyoruz. Tabi bunu yaptığımızda, sanal makina kapatılmıyor, sadece oturumu kapatmış oluyoruz. **vagrant status** komutu ile kontrol edebilirsiniz.

Makinayı kapatmak için:

```bash
vagrant halt
```

Uyku moduna almak için (suspending):

```bash
vagrant suspend
```

Uyku modundan çıkarmak için:

```bash
vagrant resume
```

Sistemi yeniden başlatmak için

```bash
vagrant reload
```

İlk kurulum yapmak veya kapatılmış bir sistemi açmak için:

```bash
vagrant up
```

Komutlarını kullanabilirsiniz. Şimdilik diyebileceklerim bu kadar. Bir sonraki yazıda Vagrant ile ince ayarlara giriş yapıp, sistemi daha işlevsel hale getireceğiz.
