---
title: Python'da Etkili Log Tutma
date: 2014-07-07
author: marjinal1st
tags: python, log, logging, tr
---

Bu yazıda Python kullanarak, bir uygulama için etkili bir şekilde log (kayıt) tutma yöntemlerine göz atacağız.

Bunun için **logging** adlı bir Python modülünü kullanacağız. Bu modül Python'la beraber standart olarak geliyor. Özel bir Python sistemi kullanmıyorsanız, kurmanıza gerek yoktur, doğrudan Python konsolundan içe aktararak kullanabilirsiniz.

```python
import logging
```

En basit haliyle, hiç bir örnekleme (initializing) bile yapmadan konsoldan şu şekilde log oluşturmaya başlayabilirsiniz.

```python
>>> logging.warning("Uyarıyorum bak, demedi deme!")
WARNING:root:Uyarıyorum bak, demedi deme!

>>> logging.error("Hatasız kul olmaz!")
ERROR:root:Hatasız kul olmaz!

>>> logging.debug("Debug ediyorum, gözlerim kapalı.")

```

Büyük ihtimalle üçüncü komutta çıktı görmeyeceksiniz zira **logging** modülünün varsayılan log seviyesi **warning**. Yani sadece mevcut seviye olan **warning** veya daha üst seviyelerin mesajları çıkacak. Tabi bunun için de bir sıralama var:

DEBUG << INFO << WARNING << ERROR << CRITICAL

Eğer log seviyesini değiştirmek isterseniz, şöyle bir kullanım gerecek:

```python
>>> logging.getLogger().setLevel(logging.DEBUG)
```

Bu şekilde log seviyesini **debug** yapmış olduk. (Diğer seçenekleriniz: logging.INFO, logging.WARNING, logging.ERROR, logging.CRITICAL) Artık debug ve üstü log seviyelerinin mesajları gözükecek.

```python
>>> logging.debug("Debug ediyorum, gözlerim kapalı.")
DEBUG:root:Debug ediyorum, gözlerim kapalı.
```

Logların mesajlarını daha düzgün bir biçimde (formatting) yazdırmamız da mümkün. Bunun için **basicConfig** adlı bir fonksiyon kullanacağız:

```python
>>> logging.basicConfig(format='%(asctime)s %(message)s', datefmt='%d/%m/%Y %H:%M:%S')
>>> logging.warning("Uyarıyorum bak, demedi deme!")
11/07/2014 09:40:53 Uyarıyorum bak demedi deme!
```

**datefmt** için istediğiniz tarzda tarih saat biçimi verebilirsiniz. **format** için ise ekstra seçenekler de mevcut. Örneğin **%(name)s** ekleyince, kullanıcı ismi; **%(levelname)s** ekleyince de log seviyesinin ismi çıkacak.

```python
>>> logging.basicConfig(format='%(asctime)s %(name)s %(levelname)s %(message)s', datefmt='%d/%m/%Y %H:%M:%S')
>>> logging.warning("Uyarıyorum bak, demedi deme!")
11/07/2014 09:48:01 root WARNING Uyarıyorum bak, demedi deme!
```

**basicConfig** fonksiyonuna log seviyesi de ekleyebilirsiniz.

```python
logging.basicConfig(format='%(asctime)s %(name)s %(levelname)s %(message)s', datefmt='%d/%m/%Y %H:%M:%S', level=logging.INFO)
```

Hatta daha da güzeli, bir seçenek daha ekleyip, logların dosyaya yazılmasını sağlayabilirsiniz:

```python
logging.basicConfig(format='%(asctime)s %(name)s %(levelname)s %(message)s', datefmt='%d/%m/%Y %H:%M:%S', level=logging.INFO, filename="dosyaismi.log")
```

Bu şekilde loglarınız dosyaya yazılacak. Şimdi log tutma olayını biraz daha üst bir seviyeye çıkartıp, tek bir yerden birden fazla log tutmaya gözatalım. Bunların tamamını bir fonksiyona ekleyip, log kurulumu için sonradan da kullanabilmeniz mümkün.

İlk iş olarak bir değişkene, temel log mekanizmasını atamamız gerekecek.

```python
logger = logging.getLogger()
```

Ve her yerde çıkması için ortak bir log formatı:

```python
formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s', '%d/%m/%Y %H:%M:%S')
```

Şimdi logları konsola çıkartacak bir log handler'ı oluşturalım. Ardından seviye ve formatı belirleyeceğiz. Son olarak da temel log tutan mekanizmaya bunu kaydettireceğiz.

```python
console_logger = logging.StreamHandler()
console_logger.setLevel(logging.WARNING)
console_logger.setFormatter(formatter)
logger.addHandler(console_logger)
```

Şimdi de logları dosyaya yazacak ayrı bir handler oluşturalım. Yine seviye ve format belirtip, kaydetme işlemlerini yapacağız.

```python
file_logger = logging.FileHandler("dosyaismi.log")
file_logger.setLevel(logging.DEBUG)
file_logger.setFormatter(formatter)
logger.addHandler(file_logger)
```

Dikkat ettiyseniz, iki farklı log tutucu için de farklı log seviyeleri verdik. Bundan sonra istediğimiz yerde log oluşturmaya başlayabiliriz:

```python
>>> logging.warning("Uyarıyorum bak, demedi deme!")
11/07/2014 10:11:41 - root - WARNING - Uyarıyorum bak, demedi deme!
>>> logging.debug("Debug ediyorum, gözlerim kapalı.")
```

Konsoldaki log tutucu için temel seviye **warning** olduğundan, **debug** türü log mesajları çıkmadı. Ama dosyayı kontrol ettiğimiz de, iki mesajın da çıktığını göreceksiniz:

```
11/07/2014 10:11:41 - root - WARNING - Uyarıyorum bak, demedi deme!
11/07/2014 10:11:43 - root - DEBUG - Debug ediyorum, gözlerim kapalı.
```

Gördüğünüz gibi, tek bir log mesajıyla, birden fazla yerde log tutabiliyoruz. İhtiyaca göre birden fazla, farklı seviyelerde dosya log tutucu ekleyebilirsiniz. Ayrıca log türünü mesajlara ekleyerek, ileride gerekebilecek bir ayrıştırma (parsing) işlemini de kolaylaştırdığımız söylenebilir.

Şimdi tüm bu log ayarları için kullandığımız kodları tek bir fonksiyona ekleyelim:

```python
def setup_log_system():
    logger = logging.getLogger()
    formatter = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                                  '%d/%m/%Y %H:%M:%S')
    
    # Konsol log tutucu
    console_logger = logging.StreamHandler()
    console_logger.setLevel(logging.WARNING)
    console_logger.setFormatter(formatter)
    logger.addHandler(console_logger)
    
    # Dosya log tutucu
    file_logger = logging.FileHandler("dosyaismi.log")
    file_logger.setLevel(logging.DEBUG)
    file_logger.setFormatter(formatter)
    logger.addHandler(file_logger)
```

Bu şekilde kullandığınız uygulama içinde, **setup_log_system** fonksiyonunu çağırarak, hızlıca log sisteminizi kurabilirsiniz.

**Logging** modülü ile ilgili daha fazla örnek için:

https://docs.python.org/2/howto/logging.html