---
title: How To Parse Excel Spreadsheets in Rails
date: 2014-03-26
author: marjinal1st
tags: excel
---

Parsing Excel spreadsheets in Rails is a quite simple task with the gem called Roo. Let’s do it step by step.

First off, you must include Roo gem in your Gemfile and install it:

```ruby
gem ‘roo’, ‘~> 1.13.2’
```

```bash
bundle install
```

Opening an Excel spreadsheet is deadly simple:

```ruby
file = Roo::Excel.new(file_path)
#or
file = Roo::Excelx.new(file_path)
```

This file instance has rows in itself. You can access them with row numbers:

```ruby
file.row(1) # Gives first row
file.row(2) # Gives second row
```

Also you can access row numbers for the first and last:

```ruby
file.first_row # Gives first row’s number, usually it’s 1
file.last_row  # Gives last row’s number
```

Each row is an array, so you can access with index, like:

```ruby
file.row(1)[0] # Gives the first value in the first row
file.row(1)[1] # Gives the second value in the first row
```

Now I would like to show a real life example with model relations. Let’s suppose we have a list which has many nodes. We are going to parse values from Excel spreadsheet and create nodes with these values which belongs to a list. Let’s take a look at models:

```ruby
class List  < ActiveRecord::Base
  has_many :nodes
end

class Node < ActiveRecord::Base
  belongs_to :list
end
```

Now we must add a method to List model in order to parse our spreadsheet:

```ruby
class List < ActiveRecord::Base
  has_many :nodes

  def parse(file_path)
    file = Roo::Excel.new(file_path)

    (1..file.last_row).each do |i|
      row = file.row(i)
      node = self.nodes.new(attribute1: row[0], attribute2: row[1]) # Depends on your needs
      node.save! if node.valid? # Make sure to use validations
    end
  end
end
```

You can also use Paperclip attachment to get file, like **self.attachment**. And it’s better if you use opening handler to support different types of Excel spreadsheets.

```ruby
def open_file(file)
  case File.extname(file.original_filename)
    when ‘.xls’ then Roo::Excel.new(file.path)
    when ‘.xlsx’ then Roo::Excelx.new(file.path)

    else raise "Unknown file type: #{file.original_filename}"
  end
end
```

Now use it in the parser method:

```ruby
def parse(file_path)
  file = open_file(file_path)
  …
  …
end
```

Last of all you might want to put **open_file** method under private. Now it's up to you when to use parser method. You can use it in basic model callbacks or observers.