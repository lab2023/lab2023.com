---
title: Bulutfon Ruby SDK
date: 2015-12-22
author: isoakbudak
tags: ruby, bulutfon, sdk, api, call, programming, process
---

Merhaba,

Bugün sizlere, gelişiminde bizim de katkıda bulunduğumuz
[`Bulutfon API`](http://api.bulutfon.com/docs) 'si için `Ruby` programlama dili ile yazılmış olan [`bulutfon_sdk gem`](https://github.com/bulutfon/ruby-sdk) 'den bahsedecek ve örnek kodlar göstereceğiz.


Bu gem ile uygulamanızın [`Bulutfon API Servisi`](https://github.com/bulutfon/documents) ile kolayca haberleşmesini sağlayabileceksiniz. SMS gönderme, arama kayıtlarına erişme, otomatik arama
oluşturma gibi birçok özelliği hızlı bir şekilde uygulmalarınıza entegre edebileceksiniz. [`Bulutfon API`](http://api.bulutfon.com/docs) ile daha fazla neler yapabileceğiniz hakkında bilgi almak için
[https://github.com/bulutfon/documents](https://github.com/bulutfon/documents) adresine göz atabilirsiniz.

Sözü daha fazla uzatmadan örnek kodlara geçelim;

# bulutfon_sdk gem 'inin yüklü olduğundan emin oluyoruz.
```ruby
require 'bulutfon_sdk'
```

# Bulutfon hesabınızdan almanız gereken API master token
```ruby
token = 'your_token'
```

# Hesap ile ilgili işlemler
```ruby
bulutfon = BulutfonSDK::REST::Bulutfon.new(token)
```

# Hesap detayları
```ruby
puts bulutfon.details
```

# Bulutfon üzerinden erişebileceğiniz nesneler. Ayrıca bu nesneleri ayrı ayrı kullanmak isterseniz alt bölümlerdeki kodları inceleyeniz.
# Örneğin SMS göndermek için `BulutfonSDK::REST::Message` sınıfını yanlız başına kullanabilirsiniz. Alt kısımda örneği bulunmaktadır.
# BulutfonSDK::REST::Message objesi
```ruby
puts bulutfon.messages
```

# BulutfonSDK::REST::MessageTitle objesi
```ruby
puts bulutfon.message_titles
```

# BulutfonSDK::REST::Did objesi
```ruby
puts bulutfon.dids
```

# BulutfonSDK::REST::Extension objesi
```ruby
puts bulutfon.extensions
```

# BulutfonSDK::REST::Group objesi
```ruby
puts bulutfon.groups
```

# BulutfonSDK::REST::Cdr objesi
```ruby
puts bulutfon.cdrs
```

# BulutfonSDK::REST::CallRecord objesi
```ruby
puts bulutfon.call_records
```

# BulutfonSDK::REST::IncomingFax objesi
```ruby
puts bulutfon.incoming_faxes
```

# BulutfonSDK::REST::OutgoingFax objesi
```ruby
puts bulutfon.outgoing_faxes
```

# BulutfonSDK::REST::Announcement objesi
```ruby
puts bulutfon.announcements
```

# BulutfonSDK::REST::AutomaticCall objesi
```ruby
puts bulutfon.automatic_calls
```

# Santrale bağlı telefon numaraları
```ruby
did = BulutfonSDK::REST::Did.new(token)
```

# Santrale bağlı telefon numaralarını listeler
```ruby
puts did.all
```

# Id 'si verilen santral numarasının detaylarını getirir
```ruby
puts did.get(1)
```

# Dahililer
```ruby
extension = BulutfonSDK::REST::Extension.new(token)
```

# Dahililerin hepsini getirir
```ruby
puts extension.all
```

# Id 'si verilen dahili detaylarını getirir
```ruby
puts extension.get(1)
```

# Yeni bir dahili oluşturma işlemi
```ruby
params = {
    full_name: 'Deneme',
    email: 'deneme@deneme.com',
    did: '905xxxxxxxxx',
    number: 9999,
    redirection_type: 'NONE',
    destination_type: 'EXTENSION',
    destination_number: '905xxxxxxxxx',
    'acl[]' => [ 'domestic', 'gsm', 'international']
}
puts extension.create(params)
```

# Dahili güncelleme işlemi
```ruby
params = {
    full_name: 'Deneme Deneme',
    'acl[]' => [ 'domestic', 'gsm']
}
puts extension.update(1, params)
```

# Dahili silme işlemi
```ruby
puts extension.delete(1)
```

# Gruplar
```ruby
group = BulutfonSDK::REST::Group.new(token)
```
# Grupları listeler
```ruby
puts group.all
```
# Id 'si verilen grup detaylarını getirir
```ruby
puts group.get(1)
```

# Arama kayıtları
```ruby
cdr = BulutfonSDK::REST::Cdr.new(token)
```
# Tüm arama kayıtlarını listeler
```ruby
puts cdr.all
```
# Arama kayıtlarını sayfalama yaparak getirir
```ruby
puts cdr.all({page: 1, limit: 1})
```
# Uuid 'si verilen arama kaydı detaylarını getirir
```ruby
puts cdr.get('uuid')
```

# Ses kayıtları
```ruby
call_record = BulutfonSDK::REST::CallRecord.new(token)
```
# Uuid 'si verilen ses kaydının bilgilerini getirir
```ruby
puts call_record.get('uuid')
```
# Uuid 'si verilen ses kaydını verilen save_path dosyasına kayıt eder
```ruby
save_path = "#{File.expand_path(File.dirname(__FILE__))}/save_uuid.ogg"
puts call_record.save('uuid', save_path)
```

# Gelen fakslar
```ruby
incoming_fax = BulutfonSDK::REST::IncomingFax.new(token)
```
# Gelen faksları listeler
```ruby
puts incoming_fax.all
```
# Uuid 'si verilen gelen faks detaylarını getirir
```ruby
puts incoming_fax.get('uuid')
```

# Uuid 'si verilen gelen faks dosyasını save_path dosyasını kayıt eder
```ruby
save_path = "#{File.expand_path(File.dirname(__FILE__))}/save_uuid.tiff"
puts incoming_fax.save('uuid', save_path)
```

# Giden fakslar
```ruby
outgoing_fax = BulutfonSDK::REST::OutgoingFax.new(token)
```

# Giden faksları listeler
```ruby
puts outgoing_fax.all
```
# Id 'si verilen giden faks detaylarını getirir
```ruby
puts outgoing_fax.get(1)
```
# Giden faks oluşturma işlemi
```ruby
file = "#{File.expand_path(File.dirname(__FILE__))}/pdf-sample.pdf"
params = {
    title: 'Deneme',
    receivers: '905xxxxxxxxx',
    did: '905xxxxxxxxx',
    attachment: file
}
puts outgoing_fax.create(params)
```

# Ses Dosyaları
```ruby
announcement = BulutfonSDK::REST::Announcement.new(token)
```
# Ses dosyalarını listeler
```ruby
puts announcement.all
```
# Id 'si verilen ses dosyası detaylarını getirir
```ruby
puts announcement.get(1)
```
# Ses dosyası oluşturur
```ruby
file = "#{File.expand_path(File.dirname(__FILE__))}/test.wav"
params = {
    name: 'Deneme',
    announcement: file
}
puts announcement.create(params)
```


# Id 'si verilen ses dosyasını, veilen dosya yoluna kayıt eder
```ruby
save_path = "#{File.expand_path(File.dirname(__FILE__))}/save_test.wav"
puts announcement.save(1, save_path)
```

# Id 'si verilen ses dosyasını siler
```ruby
puts announcement.delete(1)
```

# Otomatik Aramalar
```ruby
automatic_call = BulutfonSDK::REST::AutomaticCall.new(token)
```

# Otomatik aramalar listesini getirir
```ruby
puts automatic_call.all
```

# Id 'si verilen otomatik arama detaylarını geitirir
```ruby
puts automatic_call.get(1)
```

# Otomatik arama oluşturur ve oluşturma işleminden sonra receivers numaraları aranır.
```ruby
params = {
    title: 'Automatic call after creation',
    receivers: '905xxxxxxxxx',
    did: '905xxxxxxxxx',
    announcement_id: 1
}
puts automatic_call.create(params)
```

# Zaman planlı otomatik arama oluşturulur, Bu parametrelerde, receivers numaraları perşembe günü 10:15 ve 12:00 saatleri arasında aranır.
```ruby
params = {
    title: 'Time planned call',
    receivers: '905xxxxxxxxx',
    did: '905xxxxxxxxx',
    announcement_id: 1,
    mon_active: false,
    tue_active: false,
    wed_active: false,
    thu_active: true,
    thu_start: '10:15',
    thu_finish: '12:00',
    fri_active: false,
    sat_active: false,
    sun_active: false,
    hours_active: true
}
puts automatic_call.create(params)
```

# Mesaj Başlıkları
```ruby
message_title = BulutfonSDK::REST::MessageTitle.new(token)
```

# Mesaj başlıklarını listeler
```ruby
puts message_title.all
```

# Mesajlar
```ruby
message = BulutfonSDK::REST::Message.new(token)
```

# Mesajları listeler
```ruby
puts message.all
```

# Mesajları sayfalama yapılarak listelenir
```ruby
puts message.all({page: 1, limit: 3 })
```

# Id 'si verilen mesaj detaylarını getirir
```ruby
puts message.get(1)
```

# SMS mesajı oluşturma işlemi
```ruby
params = {
    title: 'CONFIRMED_MESSAGE_TITLE',
    content: 'Test Message',
    receivers: '905xxxxxxxxx'
}
puts message.create(params)
```

# Çok alıcılı mesja gönderme işlemi
```ruby
params_multiple = {
    title: 'CONFIRMED_MESSAGE_TITLE',
    content: 'Multiple Message',
    receivers: '905xxxxxxxxx,905xxxxxxxxx'
}
puts message.create(params_multiple)
```

# Zaman planlı mesaj gönderme işlemi
```ruby
params = {
    title: 'CONFIRMED_MESSAGE_TITLE',
    content: 'Planned message example',
    receivers: '905xxxxxxxxx',
    is_future_sms: true,
    send_date: '16/12/2015 10:00'
}
puts message.create(params)
```

Kaynakça,

- [https://bulutfon.com/](https://bulutfon.com/)
- [https://github.com/bulutfon/documents](https://github.com/bulutfon/documents)
- [https://github.com/bulutfon/ruby-sdk](https://github.com/bulutfon/ruby-sdk)
- [http://api.bulutfon.com/docs](http://api.bulutfon.com/docs)
- [http://devforums.bulutfon.com/](http://devforums.bulutfon.com/)
