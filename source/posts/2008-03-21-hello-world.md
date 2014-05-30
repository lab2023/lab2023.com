---
title: "Hello World!"
date: 2008-03-21
author: onurozgurozkan
tags: lab2023, blog, en
---

This is a sample post for design, test our new blog.

# Typography

***

## Blog Heading

# h1. Blog heading

## h2. Blog heading

### h3. Blog heading

#### h4. Blog heading

##### h5. Blog heading

###### h6. Blog heading

***

## Paragraph

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras vel turpis nec lacus dignissim faucibus a vel lorem.
Aliquam pulvinar eleifend augue. Phasellus sit amet justo quis metus porta tempus sed ut augue. Cum sociis natoque
penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eu justo ac ipsum venenatis pretium. In
faucibus tincidunt mauris nec sagittis.

Etiam eu fermentum felis. Curabitur sodales nisi tellus, eu eleifend augue vehicula et. Vestibulum ante ipsum primis
in faucibus orci luctus et ultrices posuere cubilia Curae; Etiam et mattis mauris, et dapibus dolor. Lorem ipsum dolor
sit amet, consectetur adipiscing elit. In porta nisi non nisl tincidunt, sit amet aliquam nulla consequat.
Phasellus ullamcorper turpis odio, pellentesque sodales odio bibendum quis. Nulla facilisi.

***

## Links

* This is [an example](http://example.com/ "Title") inline link with attribute.
* [This link](http://example.net/) has no title attribute. Don't use link without attribute.

***

## Emphasis

### Strong

The following snippet of text is **rendered as bold text**.

### Em

The following snippet of text is *rendered as italicized text*.

***

## Images

![Placehold.it](http://placehold.it/600x800)

***

## Abbreviations

An abbreviation of the word attribute is <abbr title="attribute">attr</abbr>.

***

## Addresses

<address>
  **Lab2023, Inc.**<br>
  795 Folsom Ave, Suite 600<br>
  San Francisco, CA 94107<br>
  <abbr title="Phone">P:</abbr> (123) 456-7890
</address>

<address>
  **Full Name**<br>
  <a href="mailto:#">first.last@example.com</a>
</address>

***

## Blockquotes

> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>

***

## Lists

### Unordered

* Lorem ipsum dolor sit amet
* Consectetur adipiscing elit
* Integer molestie lorem at massa
  * Facilisis in pretium nisl aliquet
  * Nulla volutpat aliquam velit
    * Phasellus iaculis neque
      * Purus sodales ultricies
* Vestibulum laoreet porttitor sem
* Ac tristique libero volutpat at
* Faucibus porta lacus fringilla vel
* Aenean sit amet erat nunc
* Eget porttitor lorem

### Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
   1. Facilisis in pretium nisl aliquet
   2. Nulla volutpat aliquam velit
      1. Phasellus iaculis neque
         1. Purus sodales ultricies
4. Vestibulum laoreet porttitor sem
5. Ac tristique libero volutpat at
6. Faucibus porta lacus fringilla vel
7. Aenean sit amet erat nunc
8. Eget porttitor lorem

***

# Code

## Inline code

Lorem ipsum dolor `inline code here`, consectetur adipiscing elit. Cras vel turpis nec lacus dignissim faucibus a vel lorem.
Aliquam pulvinar eleifend augue.

## Code block

**Ruby** - A description of code

```ruby
# Used to prevent the class/module from being loaded more than once
if !defined?(Kebab::VERSION)
  module Kebab
    module VERSION
      MAJOR = 2
      MINOR = 3
      TINY  = 5

      STRING = [MAJOR, MINOR, TINY].join('.')
    end
  end
end
```

**SQL** - A description of code

```sql
SELECT * FROM Customers
WHERE City LIKE 'L_n_on';
```

**BASH** - Generating an 8-character "random" string

```bash

#!/bin/bash
# rand-string.sh
# Generating an 8-character "random" string.

if [ -n "$1" ]  #  If command-line argument present,
then            #+ then set start-string to it.
  str0="$1"
else            #  Else use PID of script as start-string.
  str0="$$"
fi

POS=2  # Starting from position 2 in the string.
LEN=8  # Extract eight characters.

str1=$( echo "$str0" | md5sum | md5sum )
#  Doubly scramble     ^^^^^^   ^^^^^^
#+ by piping and repiping to md5sum.

randstring="${str1:$POS:$LEN}"
# Can parameterize ^^^^ ^^^^

echo "$randstring"

exit $?

# bozo$ ./rand-string.sh my-password
# 1bdd88c4

#  No, this is is not recommended
#+ as a method of generating hack-proof passwords.
```

***

# Social Media

## Embed Tweet

<blockquote class="twitter-tweet" lang="en"><p>İnsanların 140 karakter ile kendisini ifade etmesinden bu kadar mı korkuyorsunuz?</p>&mdash; Onur Özgür ÖZKAN (@onurozgurozkan) <a href="https://twitter.com/onurozgurozkan/statuses/446803978450632704">March 21, 2014</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[Onur Özgür ÖZKAN](http://twitter.com/onurozgurozkan)