---
title: Tmux'a Giriş
date: 2014-08-11
author: marjinal1st
tags: tmux, terminal, multiplexer, bash, tr
---

**Tmux**, kısaltmanın açılmış haliyle Terminal Multiplexer, bir **uçbirim** (terminal) çoklayıcısıdır. Aynı pencere içerisinde birden fazla terminal oturumu açıp, istediğiniz şekilde yapılandırıp kullanabilmenizi ve mevcut oturumu kaydedip-kapatıp istediğiniz zaman devam edebilmenizi sağlar. Özellikle kaydetme ve yeniden kullanma özellikleri, Tmux’ı elzem bir araç haline getiriyor.

Tmux’ın kurulumu oldukça kolay. Debian/Ubuntu ve türevlerinde kurmak için:

```bash
sudo apt-get install tmux
```

Mac OS X için:

```bash
brew install tmux
```

Arch Linux için:

```bash
sudo pacman -S tmux
```

Kurulum bu kadar. Kullanmaya başlamak için bir terminal oturumundan **tmux** komutunu verin. Yaptıktan sonra terminalin alt kısmının değiştiğini göreceksiniz. Terminali dikey olarak bölmek için şu **tuş kombinasyonunu** kullanın:

```
Ctrl-B %
```

Bulunduğunuz pencereyi yatay olarak bölmek için:

```
Ctrl-B “
```

Bu şekilde istediğiniz kadar bölme yapıp yeni oturumlar açabilirsiniz. Bulunduğunuz oturumdan bir diğerine geçmek için şunu kullanın:

```
Ctrl-B (Yön Tuşları)
```
Mevcut oturumun penceresini yeniden boyutlandırmak için ise şu kombinasyonu kullanmanız gerekiyor:

```
Ctrl-B Ctrl-(Yön Tuşları)
```

Tmux’ın genel kullanım şekli böyle. Örneğin bir oturumda web sunucu çalıştırıp, diğerinde log dosyalarını takip edip, diğerinde metin editörü ile düzenleme yapabilirsiniz. Tamamen ihtiyacınıza göre düzenlenebilir bir sistem oluşturmanız mümkün.

Şimdi ise Tmux’ın en bomba özelliklerinden bir tanesine değinmek istiyorum. Öncelikle şu komutu verin:

```
Ctrl-B D
```

Terminal penceresi kapandı değil mi? :) Burada yaptığımız şey, aslında çalışan bir Tmux oturumundan ayrılmaktan (**detaching**) ibaret. Ama Tmux oturumu kapanmadı, biz sadece o oturumla olan bağlantımızı kestik. Şimdi şu komutu verin:

```bash
tmux ls
```

Şuna benzer bir çıktı göreceksiniz: 

```
0: 1 windows (created Mon Aug 11 15:40:31 2014) [103x24]
```

Gördüğünüz çıktı, Tmux oturumlarının listesi. Çıktının başındaki numara ise, duruma göre isim de olabilir, oturum adı oluyor ve oturumlara tekrardan bağlanmak için bunu kullanıyoruz. Tekrardan bağlanmak için şu komutu verin:

```bash
tmux attach -t 0
```

Eğer bir sorun olmazsa, az önce kapattığımız terminal penceresinin tekrardan geri gelmesi lazım. İşin güzel yanı, bu oturumlardan istediğiniz kadar yapıp, birinden ayrılıp diğerine geçmeniz mümkün. Tabi oturumlar, siz Tmux oturumunu veya tek tek terminalleri kapatmadığınız sürece olduğu gibi kalıyorlar. Ekstra olarak bilgisayar kapanınca veya yeniden başlayınca da oturumlar gidiyor ama bunları da kaydetmek mümkün.

Bunun dışında güzel bir özellik de, Tmux oturumlarını en başta belirli bir isimle açabiliyorsunuz. Örnek olarak:

```bash
tmux new -s rails-projesi

# Ctrl-B D

tmux new -s django-projesi

# Ctrl-B D

tmux ls

# Çıktı
django-projesi: 1 windows (created Mon Aug 11 16:03:13 2014) [103x24]
rails-projesi: 1 windows (created Mon Aug 11 16:02:52 2014) [103x24]
```

Böylelikle farklı projeleriniz arasında rahatça geçiş yapıp, geliştirme ortamlarınızı korumanız mümkün. Tmux’la ilgili daha fazla detay ve örnek için:

https://gist.github.com/MohamedAlaa/2961058
http://cheat.errtheblog.com/s/tmux


