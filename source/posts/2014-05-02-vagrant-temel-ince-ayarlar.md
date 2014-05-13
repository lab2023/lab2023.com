---
title: Vagrant'da Temel İnce Ayarlar
date: 2014-05-13
author: marjinal1st
tags: vagrant, virtualbox, sanallaştırma, vagrant cloud, ayar, network, paylaşma, tr
---

Bir önceki yazıda Vagrant’ın ne olduğu ve nasıl kullanıldığı ile ilgili genel bir bilgi vermiştim. Şimdi ise ince ayarlara dalıp, sistemi daha da kullanışlı hale getireceğiz. Ayarları tek tek, ayrı başlıklar halinde sunacağım. Önceki yazıda olduğu gibi bunda da sistemi Virtualbox altyapısı ile kullanıyor olacağız. Başlamadan önce söyleyeyim, tüm ayarları **Vagrantfile** adlı dosyadan yapacağız. Ve ayarların uygulaması için de:

```bash
vagrant reload
```

komutunu verip, sanal makineyi yeniden başlatacağız.

##1) Bellek Miktarı ve İşlemci Sayısı

Yapılandırmaların yazıldığı bölümde, burası en üstteki **do |config|** ile en alttaki **end** arasındaki blok oluyor, şu satırları yazın. (Yorum halinde varsa, yorumu kaldırıp da kullanabilirsiniz.)

```ruby
config.vm.provider 'virtualbox' do |vb|
  vb.customize ['modifyvm', :id, '--memory', '1024', '--cpus', '2']
end
```

**--memory**’den sonraki parametreye MB cinsinden bellek miktarını, **--cpus**’dan sonraki parametreye de işlemci sayısını yazın. Bu aslında Virtualbox’ın headless modunda şu komutu vermekle aynı:

```bash
VBoxManage modifyvm SANAL_MAKİNE_KİMLİĞİ --memory 1024 --cpus 2
```

Tabi bu yöntemi değil, **Vagrantfile**’dan düzenleme yöntemini kullanmanızı tavsiye ederim ;) Dosyayı kaydettikten sonra sanal makineyi yeniden başlatın. Artık sanal makinenin 2 adet işlemcisi ve 1024 MB belleği olacak. (Tabi gerçek makine buna müsait olursa.)

##2) Port yönlendirme

Vagrant’da port yönlendirme işlemi oldukça kolay. Ayarlarınıza şu satırı ekleyin:

```ruby
config.vm.network 'forwarded_port', guest: 3000, host: 3000
```

Sanal makineyi yeniden başlattıktan sonra artık, gerçek makinenin **3000** portuna gelen istekler, sanal makinenin **3000** portuna yönlendirilecek. İstediğiniz kadar da port yönlendirmesi yapabilirsiniz, yapmanız gereken şey, bu satırın aynısından bir tane daha oluşturmak ve istediğiniz portları yazmak.

##3) Public veya Private Ağ Bağlantısı Oluşturma

Sanal makinenin, public olarak gerçek bilgisayarın ağına dahil olması için şu ayarı ekleyin:

```ruby
config.vm.network 'public_network'
```

Bunun yerine gerçek makine ile sanal arasında özel (private) bir ağ oluşturmak isterseniz ise şunu ekleyin:

```ruby
config.vm.network 'private_network', ip: '192.168.33.10'
```

IP’yi istediğiniz gibi düzenleyebilirsiniz, sonuçta bu ağ bağlantısı sadece bu sanal makine ile gerçek arasında çalışıyor olacak.

##4) Klasör Paylaşımı

Gerçek makinedeki bir klasöre erişmek için şu ayarı ekleyin:

```ruby
config.vm.synced_folder '.', '/vagrant'
```

Bu şekilde yapıp, sanal makineyi yeniden başlattığınızda, **Vagrantfile** dosyasının bulunduğu klasör, sanal makinede **/vagrant** klasörü üstünden erişilebilir olacak. Tabi bu yöntemde hem okuma hem de yazma hakları veriliyor. Sadece okunabilir olması için sonuna ufak bir parametre ekleyeceğiz:

```ruby
config.vm.synced_folder '.', '/vagrant', disabled: true
```

Bu şekilde klasöre sadece okuma haklarıyla erişebileceğiz.

##5) Temel Sistem Kalıbını Değiştirme

Bu ayar mevcut kalıp artık işinize yaramadığında, aynı ayarlarla başka bir kalıba geçmek için ideal bir çözüm oluyor. Örneğin önceki yazıda “hashicorp/precise32” kalıbını kurmuştuk. Bunu “ubuntu/trusty64” kalıbına geçirelim. İşlemi yapmak için önce sanal makineyi sileceğiz. (Önemli dosyalarınız varsa, bunları klasör paylaştırma yöntemi ile yedekleyebilirsiniz.) Şu komutu verelim:

```bash
vagrant halt && vagrant destroy
```

Ardından şu ayarı, altındaki ile değiştirin:

```ruby
config.vm.box = 'hashicorp/precise32'
# =>
config.vm.box = 'ubuntu/trusty64'
```

Ardından kalıbın indirilip kurulması için şu komutu verin:

```bash
vagrant up
```

Son komutla birlikte, [Vagrant Cloud](https://vagrantcloud.com/) sitesinden “ubuntu/trusty64” kalıbını indirilecek, kurulacak ve önceki kalıpta kullanılan ayarların aynısı bunda da geçerli olacak.

Vagrant'da aslında bundan daha fazla ayar mevcut fakat, temel kullanım için bunları bilmek yeterli. Bir sonraki yazıda, belirli kullanım senaryolarında bu aracın nasıl işe yarayacağını göstereceğim.
