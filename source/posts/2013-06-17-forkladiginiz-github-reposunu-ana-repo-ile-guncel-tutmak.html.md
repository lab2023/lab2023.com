---
title: Forkladığınız GitHub reposunu ana repo ile güncel tutmak
date: 2013-06-17
twitter: toziserikan
tags:
  - branch
  - fork
  - git
  - github
  - remote
---

Bildiginiz gibi playbook, rails-template v.b. open source projelerimizi github üzerinden güncellemeye devam ediyoruz.

Biz bu tarz projelerin (kendimize ait olan) her bir forkunun geliştiricilerde olmasının ve güncellemeleri kendi repolarından yapıp ana repoya pull request yapılması gerektigine inanıyoruz.

Bunun artı ve eksileri tartışılır ama böylelikle forklama, code review ve pull request süreçlerine de hakimiyet artacaktır. Bunun yanında bireysel github sayfalarımızda da ilgili lab2023 projelerinin tanıtımına katkısı olacaktır.

Ancak bu durum beraberinde bir sorun getirmektedir. Ne mi ?

A geliştiricisinin eklediği yeni bir içerigin B geliştiricisinde bulunan fork repoya alınması. Bunun çözümünü şu makalede bulabilirsiniz: <http://bradlyfeeley.com/2008/09/03/update-a-github-fork-from-the-original-repo/> Ben yine de aşağıda kısa bir özet geçmek istiyorum;

Playbook' u ele alırsak. Ben kendi bilgisayarıma **lab2023/playbook**'u clonladım. Ardından kendi hesabıma bu repoyu forkladım ve lokalime **lab2023/playbook** dan çatallanan **tayfunoziserikan/playbook** reposunu playbook-fork adı altında tekrar klonladım. Bu repoya da yukarıdaki makalede anlatıldıgı şekilde;

    git remote add --track master playbook git@github.com:lab2023/playbook.git


remote branch'ını ekledim. Artık orjinal playbook' da yapılan diğer değişiklikleri bu branch'a fetch yapıp kendi master branch'ına merge ederek playbook-fork repomun güncel kalmasını sağlayabiliyorum.

İyi çalışmalar.