#= require bootstrap
#= require vendor/retina-1.1.0.min
#= require vendor/skrollr.min.js

# Define dynamic resize function
dynamicResizer = ->
  $('header .wrapper .heroes').css('margin-top', (($(window).height() - $('header .wrapper .heroes').height()) / 2) - 70)
  $('header .wrapper').height($(window).height()) if $(window).height() > 480 and $('header .wrapper') isnt `undefined`

$(document).ready ->
  #Tooltips
  $('[data-toggle=tooltip]').tooltip()
  $('[data-toggle=popover]').popover
    trigger: 'hover'
    delay: { show: 100 }
    html: true
    title: ->
      $(this).find('.popover-content .title').html()
    content: ->
      $(this).find('.popover-content .content').html()

  # Scroll Spy
  $("body").scrollspy
    target: '#navigation'

  $("[data-spy=\"scroll\"]").each ->
    $spy = $(this).scrollspy("refresh")
    return

  # Fixed nav toggle
  $(window).bind "scroll", ->
    if $(window).scrollTop() > 700
      $("#navigation").fadeIn("fast")
    else
      $("#navigation").fadeOut("fast")

  # Parallax with skrollr
  if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    $("body").addClass("is_mobile");
  else
    $("body").removeClass("is_mobile");
    skrollr.init()

  # Smooth scroll
  $("a[href*=#]:not([href=#])").click ->
    if location.pathname.replace(/^\//, "") is @pathname.replace(/^\//, "") and location.hostname is @hostname
      target = $(@hash)
      target = (if target.length then target else $("[name=" + @hash.slice(1) + "]"))
      offset_top = (if $(this).data("offset-top") then $(this).data("offset-top") else 20)
      if target.length
        $("html,body").animate
          scrollTop: target.offset().top - offset_top + 25
        ,
          duration: 800
        false

  #Team Filters
  $("ul.team-members li").click ->
    $(this).toggleClass('active')


  # Dynamic header size
  $(window).resize ->
    dynamicResizer()
  dynamicResizer()



