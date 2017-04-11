---
title: Rails Urlden Namespace Gizleme
date: 2013-06-17
author: dilekmuhammet
tags: namespace, tr
---

Urlden namespace gizlemek için `namespace :admin` yerine `scope :module => 'admin'` kulanıyoruz. Örneğin;

```ruby
namespace :admin do
  resources :posts, :comments
end
```

Oluşacak url `/admin/posts`,

Oluşacak url helper `admin_posts_path`,

```ruby
scope :module => "admin" do
    resources :posts, :comments
end
```

Oluşacak url `/posts` olacaktır,

Oluşacak url helper `posts_path` şeklinde olacaktır.

Kaynak: http://guides.rubyonrails.org/routing.html#controller-namespaces-and-routing

Kolaylıklar dilerim...