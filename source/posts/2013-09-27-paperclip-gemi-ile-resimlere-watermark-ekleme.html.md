---
title: Paperclip gemi ile resimlere watermark ekleme
date: 2013-09-27
author: hamitturkukaya
tags: paperclip
---

[Paperclip][1] gemi varsayılan olarak resimlere watermark eklemeyi desteklemiyor. Bu yüzden watermark ekleyebilmek için projeye, imagemagick'in resimleri birleştirme komutu olan 'composite' i içeren bir processor eklememiz gerekiyor.

<!--more-->

Öncelikle paperclip geminin processorları aradığı

    lib/paperclip_processors


klasörünün içine watermark.rb dosyamızı oluşturup

    module Paperclip
      class Watermark < Thumbnail
        # Handles watermarking of images that are uploaded.
        attr_accessor :format, :whiny, :watermark_path, :position

        def initialize file, options = {}, attachment = nil
          super
          @file             = file
          @whiny            = options[:whiny].nil? ? true : options[:whiny]
          @format           = options[:format]
          @watermark_path   = options[:watermark_path]
          @position         = options[:watermark_position].nil? ? "SouthEast" : options[:watermark_position]

          @current_format   = File.extname(@file.path)
          @basename         = File.basename(@file.path, @current_format)
        end

        # Performs the conversion of the +file+ into a watermark. Returns the Tempfile
        # that contains the new image.
        def make
          return @file unless watermark_path

          dst = Tempfile.new([@basename, @format].compact.join("."))
          dst.binmode

          command = "composite"
          params = "-gravity #{@position} #{watermark_path} #{fromfile} #{tofile(dst)}"

          begin
            success = Paperclip.run(command, params)
          rescue PaperclipCommandLineError
            raise PaperclipError, "There was an error processing the watermark for #{@basename}" if @whiny
          end

          dst
        end

        def fromfile
          "\"#{ File.expand_path(@file.path) }[0]\""
        end

        def tofile(destination)
          "\"#{ File.expand_path(destination.path) }[0]\""
        end
      end
    end


şeklinde watermark classımızı ekliyoruz.

Ardından ilgili model dosyamızda

    has_attached_file :photo,
    processors: [:thumbnail, :watermark],
    styles: {
      zoom: { geometry: '1024x576#', watermark_path: "#{Rails.root}/app/assets/images/watermarks/watermark_zoom.png"},
      main: { geometry: '770x520#', watermark_path: "#{Rails.root}/app/assets/images/watermarks/watermark_main.png"}
    }


şeklinde eklediğimiz resimler için kullanılacak processorlerı tanımlıyoruz, thumbnail resimlerin boyutunu düzenlemek için paperclipte tanımlanmış processor classıdır eklenmediği sürece resim boyutlandırması yapılmaz. Ardından farklı boyutlar için yeniden boyutlandırma için geometry ve watermark olarak eklenecek resmimizin path'ini veriyoruz.

Bu işlemlerden sonra eklenecek her resime watermark'ınız eklenecektir.

Eğer daha önce upload ettiğiniz resimlere de watermark'ınızın eklenmesini istiyorsanız.

    rake paperclip:refresh class=Product


rake'ini çalıştırmanız yeterlidir.

 [1]: https://github.com/thoughtbot/paperclip