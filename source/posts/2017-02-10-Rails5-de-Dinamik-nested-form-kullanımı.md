---
title: Rails5 de Dinamik Nested Form Kullanımı
date: 2017-02-10
author: h_1520
tags: ruby, dynamic, nested, form, rails, programming
---

Bu yazıda sizelere Rails'de dinamik nested form kullanımını bir örnek ile göstereceğim. Eğer birbiri ile ilişkili iki modeliniz var ise ve tek bir form üzerinden kayıt yapacaksanız nested form kullanmanız gerekiyor.
Şimdi öncelikle aşağıdaki gibi birbiri ile ilişkili iki modelinizin olduğu bir rails projeniz olduğunu varsayalım. İlişki şekli şu şekilde olsun Customer(Müşteri) ve Customer'ın AuthorizedPerson(YetkiliKişi)'ları.
Aşağıda `accepts_nested_attributes_for`ile nested attribute ilişkiyi kuruyoruz

```ruby
# app/models/customer.rb
has_many :authorized_persons, dependent: :destroy
accepts_nested_attributes_for :authorized_persons, allow_destroy: true

# app/models/authorized_person.rb
belongs_to :customer, optional: true
```

Strong parametrelerimizi aşağıdaki gibi ayarlıyoruz. Burada `authorized_persons_attributes` ile AuthorizedPerson için gelen verilerin geçmesine izin veriyoruz.

```ruby
#app/controllers/customers_controller.rb
def customer_params
    params.require(:customer).permit(:name, authorized_persons_attributes: [:id, :email, :_destroy])
end
```

formumuzu aşağıdaki gibi oluşturuyoruz, aşağıdaki `fields_for` kısmı nested formda ilgili diğer modelimizin alanlarını eklemek için gerekli alandır. 

```ruby
= simple_form_for(@customer, validate: true) do |f|
  .form-inputs
    = f.input :name
    = link_to_add_fields 'Add Authorized People', f, :authorized_persons
        = f.fields_for :authorized_persons do |builder|
          = render 'authorized_person_fields', f: builder

  .form-actions
    = f.button :submit
```

Helper dosyamıza aşağıdaki kodları koyuyoruz:

```ruby
#app/helpers/application_helper.rb
def link_to_add_fields(name, f, association)
    new_object = f.object.send(association).klass.new
    id = new_object.object_id
    fields = f.fields_for(association, new_object, child_index: id) do |builder|
      render(association.to_s.singularize + '_fields', f: builder)
    end
    link_to(name, '#', class: 'add_fields', data: {id: id, fields: fields.gsub('\n', '')})
end
```

`_authorized_person_fields` dosyamız aşağıdaki gibidir.

```ruby
#app/views/customers/_authorized_person_fields.html.haml
%fieldset
    = link_to 'Remove Authorized People', '#', class: 'remove_fields'
    = f.input :email
    = f.hidden_field :_destroy
```

coffescript dosyamıza da aşağıdaki kodlarımızı koyuyoruz:

```javascript
$(document).on 'click', 'form .remove_fields', (event) ->
    $(this).prev('input[type=hidden]').val('1')
    $(this).closest('fieldset').remove()
    event.preventDefault()

$(document).on 'click', 'form .add_fields', (event) ->
    time = new Date().getTime()
    regexp = new RegExp($(this).data('id'), 'g')
    $(this).before($(this).data('fields').replace(regexp, time))
    event.preventDefault()
```

Yukarıda yaptığımız işlemler ile aşağıdaki gibi bir çıktı elde edeceksiniz:

![form](articles/2017-02-10-Rails-Dynamic-Nested-Form.png)