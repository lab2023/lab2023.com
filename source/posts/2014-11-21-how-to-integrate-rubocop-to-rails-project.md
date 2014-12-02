---
title: How to Integrate Rubocop to Rails Project ?
date: 2014-11-21
author: leylakapi
tags: rubocop, ruby, rails, built, error, gem, yml, en
---

You have a rails project and you are coding randomly. But you're thinking for your code quality shouldn't compromise, in this step
`rubocop` helped to you.

**Rubocop** is code analyzer tool, scanning your codes according to [ruby style guide](https://github.com/bbatsov/ruby-style-guide) and 
find bugs like typo or sometimes fix your bugs. With `rubocop`, your code quality is increase, you start coding more clean and coding like professional.

Before setup and using `rubocop`, you should be careful for integrate your project with `git` or derivatives. Then you should make below step by step.
 

- Open `Gemfile` in your rails project, add below `gems`

```ruby
group :development do
  gem 'rubocop', require: false
  gem 'haml-lint', require: false
end
```

After running `bundle` command, for see working logic of the rubocop, you can run below command,
 
```bash
$ rubocop -RD
```

- Let's continue to integration steps, you should create `.rubocop.yml` file on root of your rails project. Then running below commands,

```bash
$ rubocop --auto-gen-config
```

When you running above commands, rubocop created `.rubocop-todo.yml` file automatically on your root of rails project. `.rubocop-todo.yml` offer a list including
bug checks and counts. In addition if you use `ubuntu` desktop, you should run below command.
 
```bash
$ rubocop --config .rubocop_todo.yml
```

- After that we created `.rubocop.yml` file. In this file, we can write which file you want to include or exclude with below code

```yml
AllCops:
  Include:
    - Rakefile
    - config.ru
  Exclude:
    - db/schema.rb
```

But if you don't want to make include or exclude, you don't need to create `.rubocop.yml` files. Without create `.rubocop.yml` file, you can run above commands. 
Thus you can integrate `rubocop` to your rails project.
 
After you integrate `rubocop` to your project, you should run
 
```bash
$ rubocop
```

instead of above command, if you run below command, rubocop give you details list for your bugs and errors.
 
```bash
$ rubocop -R 
```

For detail you can visit [Rubocop Github Page](https://github.com/bbatsov/rubocop). 