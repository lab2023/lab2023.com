---
title: Ubuntu'da Screen Kullanımı
date: 2014-06-20
author: hamitturkukaya
tags: ubuntu, screen, ssh, tr
---

Sunucunuza ssh ile bağlanarak çalıştırdığınız bir komutun tamamlanması saatler sürebilir, bu sürede ssh bağlantınız 
kapansa bile işlemin devam etmesini istiyorsanız Screen uygulamasını kullanabilirsiniz. Screen aslında terminal 
çoğullayıcı uygulaması. Farklı session'lara sahip birden fazla terminal ekranını yönetmek için kullanılmakta.

Ubuntu'da screen'i kullanmaya başlamak için terminal üzerinde


```bash
    screen -v
```

komutunu çalıştıralım, bu komut screen komutu yüklüyse, yüklü komutun versiyonunu verir.
Komutun bulunamadı ile ilgili bir hata mesajı alırsanız screen komutunu yüklemek için:

```bash
sudo apt-get install screen
```

komutunu kullanabilirsiniz. Kurulum tamamlandıktan sonra

```bash
    screen
```

komutu ile screen uygulamamızı başlatabiliriz.


### Başlıca komutlar

Screen üzerinde yapacağımız işlemleri

```bash
    ctrl+ a command
```

şeklinde gerçekleştiriyoruz.Bu komutla screen komut arayüzüne geçiş yapmış oluyoruz.Burada dikkat edilmesi gereken 
ctrl ve a tuşlarına aynı anda bastıktan sonra komut kısayoluna basarken elinizi ctrl'den çekmenizdir.

tüm komut listesine
 
```bash
    ctrl+ a ?
```

ile ulaşabilirsiniz.

```text
                       Screen key bindings, page 1 of 2.

                       Command key:  ^A   Literal ^A:  a

  break       ^B b         license     ,            removebuf   =
  clear       C            lockscreen  ^X x         reset       Z
  colon       :            log         H            screen      ^C c
  copy        ^[ [         login       L            select      '
  detach      ^D d         meta        a            silence     _
  digraph     ^V           monitor     M            split       S
  displays    *            next        ^@ ^N sp n   suspend     ^Z z
  dumptermcap .            number      N            time        ^T t
  fit         F            only        Q            title       A
  flow        ^F f         other       ^A           vbell       ^G
  focus       ^I           pow_break   B            version     v
  hardcopy    h            pow_detach  D            width       W
  help        ?            prev        ^H ^P p ^?   windows     ^W w
  history     { }          quit        \            wrap        ^R r
  info        i            readbuf     <            writebuf    >
  kill        K k          redisplay   ^L l         xoff        ^S s
  lastmsg     ^M m         remove      X            xon         ^Q q


                  [Press Space for next page; Return to end.]
```

verdiğiniz bir komutu çalıştırmaya devam ederken ana ekrana dönmek için

```bash
ctrl-a d
```

yani detach komutunu kullanabilirsiniz.

Örnek olarak screen ile açtığınız ekranda `top` komutunu çalıştıralım. Ardından;

```bash
ctrl-a d
```

tuş kombinasyonu ile ana oturuma dönelim. Detach ettiğimiz oturuma tekrardan erişmek için:

```bash
    screen -ls
```

komutu ile çalışır haldeki oturumları ve id'lerini görebilirsiniz

```text
    There are screens on:
    	2667.pts-0.turkukaya	(06/06/2014 05:02:46 AM)	(Detached)
    	2361.pts-0.turkukaya	(06/06/2014 04:53:20 AM)	(Detached)
    2 Sockets in /var/run/screen/S-deployer.
```

ardından,

```bash
   screen -r process_id
```

komutu ile tekrardan oturumunuza erişebilirsiniz. Giriş yaptığınızda, `top` komutunun hala çalışmaya devam ettiğini 
görebilirsiniz.
 
Oturumu tamamen sonlandırmak için ise;

```bash
    ctrl-a k
```

komutunu kullanabilirsiniz. (Onayladıktan sonra o oturumu tekrar geri çağıramazsınız).