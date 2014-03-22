---
title: Github Issue Tracker & Huboard ve Etiketler
date: 2013-06-14
twitter: onurozgurozkan
tags:
  - github
  - huboard
---

Merhabalar,

Firma olarak proje yönetiminde aşağıdaki araçları kullanıyoruz.

1.  [Github][1]
2.  [Huboard][2]

Huboard'un kanbanın kolomlarını Github Issue etkiletlerinden yapmaktadır. Bizlerde firma olarak resimde görünen issue etiketlerini kullanıyoruz.

![Github Issueları][3]

**0 - Backlog** [HEX: #DDDDDD]

Müşteri tarafından istenen ama yapılıp yapılmamasına karar verilmeyen issuelardır.

**1 - Ready** [HEX: #FBCA04]

Müşteri tarafından istenen, nasıl yapılacağı belirlenmiş ve iterasyon planına alınmasında bir sakınca olmayn issuelardır.

**2 - In Progress** [HEX: #07D8E2]

İterasyon planında olan ve şu an bir developer tarafından yapılan issue dur.

**3 - Done** [HEX: #02E10C]

Developer tarafından bitirilmiş ve develop brancha push edilmiş issuedur.

**4 - Reviewed** [HEX: #1007E2]

Diğer developerlar tarafından review edilmiş issuelardır. Bu issuelar artık staging sunucusuna gönderilebilir. Reviewed eden developer ilgili issuenun commit notlarınının altına :+1: şeklinde comment düşer ve issuenun etiketini reviewed yapar.

**Enhancement** [HEX: #84B6EB]

Bir öneri, iyileştirmedir.

**Bug** [HEX: #FC2929]

Hatasız kul olmaz!

**Future** [HEX: #E6E6E6]

Müşteri ile yapılan anlaşma çerçevesinde olmayan yeni tip isteklerdir. İleride bunlar yeni bir anlaşma ile backlog statüsüne alınabilir. Unutmayalım github reposu firmamıza ait değildir. Github repolarını müşteri adına açıyoruz. Belki müşterimiz ileri de başka firmalar ile çalışmak isterse bu isteklere ulaşmak isteyebilir.

**Question** [HEX: #CC307C]

Ekibin birbirine sorduğu sorulardır.

## Dikkat Edilmesi Gereken Konular

1.  Bütün projelerde bu 9 adet issue olmalıdır.
2.  Commit notları ile kesinlikle issuelar kapatılmamalıdır. İssuelar production sunucusuna deploy sonucunda sorun yoksa proje yöneticisi tarafından kapatılacaktır.

 [1]: https://github.com/
 [2]: http://huboard.com/
 [3]: http://www.lab2023.com/wp-content/uploads/2013/06/github-etiketleri-226x300.png