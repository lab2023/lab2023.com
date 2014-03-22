---
title: git-flow ve varsayılan branch master'dan farklı iken kullanımı
date: 2013-08-01
twitter: baygunm
tags:
  - git-flow
---

Projelerde birden fazla branch kullanımı çok doğal. Zaman zaman varsayılan branch master'dan farklı da olabiliyor. Bu gibi durumlarda, projeyi kendi üzerine yeni çeken kişi, git-flow initialize etmek istediğinde hata alıyor. Ancak bu problemi aşmak ve git-flow'u kullanabilmek mümkün.

Nasıl mı? İşte cevabı:

Örneğin varsayılan branch develop olduğunda projeyi checkout edelim. Hemen ardından, git-flow initialize etmek istersek aşağıdaki hatayı alıyoruz.

    #git flow init

    Which branch should be used for bringing forth production releases?
       - develop
    Branch name for production releases: []
    Local branch '' does not exist.


Panik yapıp işleri karıştırmaya, hataya kızıp git-flow kullanımını bırakmaya gerek yok.

Peki ne yapacağız? Çok basit.

Master branch checkout edelim:

    #git checkout master
    Branch master set up to track remote branch master from origin.
    Switched to a new branch 'master'


Sonrasında git-flow initialize edelim. (Varsayılan değerleri kabul edebilirsiniz)

    #git flow init

    Which branch should be used for bringing forth production releases?
       - develop
       - master
    Branch name for production releases: [master]

    Which branch should be used for integration of the "next release"?
       - develop
    Branch name for "next release" development: [develop]

    How to name your supporting branch prefixes?
    Feature branches? [feature/]
    Release branches? [release/]
    Hotfix branches? [hotfix/]
    Support branches? [support/]
    Version tag prefix? []


En son olarak develop branch'ını, tekrardan checkout edelim.

    #git checkout develop
    Switched to branch 'develop'


Hepsi bu kadar. Artık git-flow ve nimetlerinden faydalanabilirsiniz.