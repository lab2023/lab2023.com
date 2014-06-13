---
title: Rails' de Elasticsearch Kullanımı
date: 2014-06-13
author: marjinal1st
tags: rails, elasticsearch, arama, full, text, tr
---

Rails web uygulamalarında içerik araması temel olarak oldukça kolay olsa da, tam metin araması (full text search) gerektiği zaman uygun bir çözüm bulmak zor oluyor. Bu yazıda, **full text search** konusunda en bilindik ve başarılı çözümlerden birisi olan [Elasticsearch](http://www.elasticsearch.org/) yazılımını, Rails uygulamanıza nasıl entegre edebileceğinizi anlatacağım.

Başlamadan önce şöyle bir açıklama yapmak lazım ki, Elasticsearch bir gem değil, apayrı bir yazılım. Hatta buna arama motoru demek çok da yanlış olmaz. Öncelikle Elasticsearch yazılımını ayrı bir şekilde kuracağız ve onunla etkileşime geçmesi için de bir bağdaştırıcı (adapter) gemi kullanacağız.

Başlamak için Elasticsearch yazılımını kuralım. İsteğe bağlı olarak GNU/Linux dağıtımınızın deposundan (bir çok popüler dağıtımda mevcut) aratıp kurabilirsiniz. Bunun dışında Mac OS X kullanıyorsanız aşağıdaki komutlar ile hızlıca kurup, kullanmaya başlayabilirsiniz:

```bash
$ brew install elasticsearch
$ elasticsearch -D es.config=/usr/local/opt/elasticsearch/config/elasticsearch.yml
```

Ancak ben bu yazıda, daha genel ve esnek olmasından dolayı indirip elle çalıştırma yöntemini kullanacağım. Aşağıdaki siteye girelim ve arşivlenmiş bir sürümünü indirerek başlayalım:

http://www.elasticsearch.org/overview/elkdownloads/

ZIP veya TAR olarak indirdiğiniz paketi açın ve terminalinizden, açılan paketin klasörüne girin. Ardından çalıştırmak için şu komutu verin: (**Önemli:** Elasticsearch'ü çalıştırmak için sisteminizde [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html?ssSourceSiteId=otnjp)'nın en az 6.0 sürümü [bulunmalı](http://www.elasticsearch.org/guide/en/elasticsearch/hadoop/current/requirements.html#requirements-jdk).)

```bash
$ ./bin/elasticsearch
```

Sistemin çalışıp çalışmadığını test etmek için, ufak bir HTTP isteği yapalım. Başka bir terminal oturumundan şu komutu verin:

```bash
$ curl -X GET http://localhost:9200/
```

Eğer hiçbir sıkıntı yoksa, şuna benzeyen bir JSON verisi cevap olarak dönecek:

```json
{
  "status" : 200,
  "name" : "Emplate",
  "version" : {
    "number" : "1.2.0",
    "build_hash" : "c82387f290c21505f781c695f365d0ef4098b272",
    "build_timestamp" : "2014-05-22T12:49:13Z",
    "build_snapshot" : false,
    "lucene_version" : "4.8"
  },
  "tagline" : "You Know, for Search"
}
```

Şimdi sıra geldi uygulamayı Rails ile bütünleştirmeye. Bunun için **elasticsearch-model** ve **elasticsearch-rails** [gemlerini](https://github.com/elasticsearch/elasticsearch-rails) kullanacağız. Biraz bahsetmek gerekirse: **elasticsearch-model** gemi, Elasticsearch arama motoru ile etkileşime geçen bağdaştırıcı (adapter) kütüphanedir. Bunun dışında diğer gem olan **elasticsearch-rails** ise Rails'de kullanımı kolaylaştırmak için ekstra araçlara (Rake görevleri vs.) sahiptir.

Kullanmaya başlamak için uygulamanızın **Gemfile** dosyasına şu iki satırı ekleyin:

```ruby
gem 'elasticsearch-model'
gem 'elasticsearch-rails'
```

Ardından gemleri yükleyin:

```bash
$ bundle install
```

Bundan sonrasında yapmanız gereken tek şey, ihtiyaç duyduğunuz modellere şu satırları eklemek. Örnek bir model ile gösteriyorum:

```ruby
class Product < ActiveRecord::Base
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks
end
```

Ve kullanmaya başlayabiliriz. Test etmek için Rails konsoluna girelim:

```bash
$ rails c
```

```ruby
@products = Product.search('foo bar').records
```

Bu şekilde modeller üstünden full text search araması yapılabilmekte. **search** metotundan sonra kullandığımız **records** metotu da, bunu normal bir ActiveRecord sorgu sonucu olarak kullanabilmemizi sağlıyor. Bu sayede, bunu kontrolcüde de kullanıp, verileri sıkıntısız bir şekilde görünüm (view) katmanına taşıyarak kullanabilirsiniz.

Ekstra olarak, eğer **elasticsearch-rails** geminden gelen Rake görevlerini (task) kullanmak isterseniz, uygulamanızın Rakefile dosyasının başına şunu ekleyin:

```ruby
require 'elasticsearch/rails/tasks/import'
```

Ardından eski kayıtların Elasticsearch tarafından import edilmesi için de şu komutu verin:

```bash
bundle exec rake environment elasticsearch:import:all
```

Aynı işi, Rails konsolundan şu şekilde de yapmanız mümkün:

```ruby
Product.import
```
