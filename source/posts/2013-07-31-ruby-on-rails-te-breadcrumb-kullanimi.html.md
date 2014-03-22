---
title: Ruby on Rails'te Breadcrumb kullanımı
date: 2013-07-31
twitter: hamitturkukaya
tags:
  - breadcrumbs
---

Ekmek kırıntısı anlamına gelen breadcrumbs web sayfalarında kullanıcının bulunduğu yeri rahat takip edebilsin ve gezinebilsin diye koyulan navigasyon sistemidir.

Ruby on Rails'de bunun için geliştirilen [breadcrumbs_on_rails][1] geminin kullanımını anlatacağım.

Öncelikle

    gem install breadcrumbs_on_rails


diyerek gemi kuruyoruz ve projemizin Gemfile'ına

    gem 'breadcrumbs_on_rails'


satırıyla ekliyoruz.

Artık yapmamız gereken her controller methodu içerisinde kullanıcı oradayken ne görmesi gerekiyorsa

    def show
        @product = Product.find(params[:id])
        add_breadcrumb @product.name, product_path(@product)
    end


şeklinde yazmak. Bir method içerisinde birden fazla breadcrumb ekleyebilirsiniz. Hepsi sırasıyla görüntülenir.

Son olarak breadcrumb'ın görünmesini istediğiniz layout'ta

    = render_breadcrumbs :separator => ' / '


koduyla breadcrumbları listeleyebilirsiniz.

Ayrıca farklı stillerde görüntülemek için kendiniz manuel builderlar yazabilirsiniz. Örneğin twitter bootstrap tarzı breadcrumb için örnek builder

    class BootstrapBreadcrumbsBuilder < BreadcrumbsOnRails::Breadcrumbs::Builder
        def render
            @context.content_tag(:ul, :class => 'breadcrumb') do
            elements_count = @elements.size
            i = 0
            @elements.collect do |element|
                i += 1
                render_element(element, last = (i == elements_count))
                end.join.html_safe
            end
        end
        def render_element(element, last = false)
            current = @context.current_page?(compute_path(element))
            @context.content_tag(:li, :class => ('active' if last)) do
                if last
                    link_or_text = compute_name(element)
                else
                    link_or_text = @context.link_to(compute_name(element), compute_path(element), element.options)
                end
                divider = @context.content_tag(:span, (@options[:separator] || ' &gt; ').html_safe, :class => 'divider') unless current
                link_or_text + (last ? '' : (divider || ''))
            end
        end
    end


şeklindedir. Bunu "lib/bootstrap_breadcrumbs_builder.rb" içine yazarak.

    = render_breadcrumbs :builder => ::BootstrapBreadcrumbsBuilder, :separator => "&raquo;"


şeklinde kullanabilirsiniz.

 [1]: https://github.com/weppos/breadcrumbs_on_rails
