---
title: Ruby On Rails Helper İçerisinde Haml Kullanmak
date: 2013-06-22
twitter: dilekmuhammet
tags:
  - haml
---

Ruby On Rails `Helper` dosyaları içerisinde `Haml` kullanmak için

*   `capture_haml`,
*   `haml_tag`,
*   `haml_concat`

`Haml` helper' larını kullanacağız.

### `capture_haml`

Haml kod bloğunu çıktı olarak verir. Çıktı string html kodudur.

### `haml_tag`

Verilen parametrelere göre html tag' ı oluşturur.

### `haml_concat`

Text olarak çıktı verir.

Şimdi aşağıdaki örneği inceleyelim

    module ApplicationHelper
      def format_state(state, large = false)
        capture_haml do
          css_classes = %w(label)
          css_classes << state
          css_classes << 'large' if large
          haml_tag :span, class: css_classes do
            haml_concat t("helpers.state.#{state}")
          end
        end
      end
    end


`haml_tag` ile `span` tag' ı oluşturup `class:` parametresi ile class veriyoruz. `haml_concat` ile de span tag' ı içerisine yazacağımız text' i oluşturuyoruz.

Kolay gelsin...
