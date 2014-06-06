---
title: Using Medium Editor as Input Field in Rails
date: 2013-12-10
author: marjinal1st
tags: medium editor, en
---

Medium Editor is seriously a stunning WYSIWYG editor. Simple, stylish, easy to use… But you can also use it as an input field, with some Javascript magic :)

First off, you must include JS and CSS files of Medium Editor. It doesn’t matter if you use from CDN or local folders.

<https://github.com/daviferreira/medium-editor>

I’m using it in a form partial (one of my current projects).

```haml
=stylesheet_link_tag 'medium-editor.css'
=javascript_include_tag 'medium-editor'
= form_for @post do |f|
  = f.hidden_field :body, html: { id: "body" }
  .editable { data: { field: { id: "body" } } }
  = f.submit
=javascript_include_tag 'input-field'
```




Normally you can just add `.editable` class on any element you like but you can't do it for an input field. What I've done is, I just created my input field as hidden and a editable div with ***data-field-id*** is `body.

IDs of input field and editable field must be same, so we can create a polymorphic system for synchronization. Let's get to the ***input-field.js*** file.

```coffee
var editor = new MediumEditor('.editable');
$('.editable').bind('input propertychange', function() {
  $("#post_" + $(this).attr("data-field-id")).val($(this).html());
});
```

When you create a MediumEditor object with `.editable class, all elements (except input fields) with `.editable` class will turn into Medium Editor.

Real magic we'll use is  `bind` method of HTML elements. (Also I must warn you that you must include standard jQuery libraries). When a editable class element is changed, inner code of bind method will run. This way we'll get the editable element's ***data-field-id*** and concatenate it with `#post_` string.

Then we set the value of `#post_element` with editable class element's inner HTML. If you keep the names of hidden element and editable section same, you get a polymorphic synchronization. So you can use multiple Medium Editor input fields.

