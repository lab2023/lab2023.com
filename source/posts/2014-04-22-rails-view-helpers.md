---
title: Rails View Helpers With Haml
date: 2014-04-22
author: onurozgurozkan
tags: rails, view helpers, haml, en
---

Our marketting department recorded a lot of [tutorial](http://www.youtube.com/user/Bulutfon) [videos](https://vimeo.com/bulutfon) at last week. They want to link to related videos at related pages. Let's do this with a clever way.

This is our sample haml code block which shows icons and link to videos. As you see there are duplicate codes.
=======

```haml
- content_for :toolbar do
  = link_to 'Vimeo',   'https://vimeo.com/92406233',           target: '_blank'
  = link_to 'Youtube', 'http://www.youtube.com/user/Bulutfon', target: '_blank'
```

There is a `helpers` directory in app folder and we write our custom view helper there.


````
app/
   assets/
   controllers/
   helpers/  <-- HERE
   mailers/
   models/
   views/
```

Let's create our custom helper.

```ruby
# app/helpers/app_custom_helper.rb
module AppCustomHelper 
  def video_link title, url
    capture_haml do
      haml_concat link_to title, url, target: '_blank'
    end
  end
end
```

Now you can use view helper in your haml files like

```haml
- content_for :toolbar do
  = video_link 'Vimeo',   'https://vimeo.com/92406233'
  = video_link 'Youtube', 'http://www.youtube.com/user/Bulutfon'
```

If you want to make global change, you just modify the helper file. For example add `btn btn-default` css class all video links.

```ruby
# app/helpers/app_custom_helper.rb
module AppCustomHelper 
  def video_link title, url
    capture_haml do
      haml_concat link_to title, url, target: '_blank', class: 'btn btn-default'
    end
  end
end
```
If we don't use rails view helpers, we should add `class: 'btn btn-default'` code to all page.

Resource

1. [http://haml.info/docs/yardoc/Haml/Helpers.html#capture_haml-instance_method](http://haml.info/docs/yardoc/Haml/Helpers.html#capture_haml-instance_method)
2. [http://haml.info/docs/yardoc/Haml/Helpers.html#haml_concat-instance_method](http://haml.info/docs/yardoc/Haml/Helpers.html#haml_concat-instance_method)