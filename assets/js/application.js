// Dynamic resize function
function dynamicResizer() {
  var heroes = $('header .wrapper .heroes');
  var wrapper = $('header .wrapper');

  if (heroes.length) {
    heroes.css('margin-top', (($(window).height() - heroes.height()) / 2) - 70);
  }

  if ($(window).height() > 480 && wrapper.length) {
    wrapper.height($(window).height());
  }
}

$(document).ready(function() {
  // Tooltips
  $('[data-toggle=tooltip]').tooltip();

  // Popovers
  $('[data-toggle=popover]').popover({
    trigger: 'hover',
    delay: { show: 100 },
    html: true,
    title: function() {
      return $(this).find('.popover-content .title').html();
    },
    content: function() {
      return $(this).find('.popover-content .content').html();
    }
  });

  // Scroll Spy
  $("body").scrollspy({
    target: '#navigation'
  });

  $("[data-spy='scroll']").each(function() {
    $(this).scrollspy("refresh");
  });

  // Fixed nav toggle
  $(window).bind("scroll", function() {
    if ($(window).scrollTop() > 700) {
      $("#navigation").fadeIn("fast");
    } else {
      $("#navigation").fadeOut("fast");
    }
  });

  // Parallax with skrollr
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $("body").addClass("is_mobile");
  } else {
    $("body").removeClass("is_mobile");
    if (typeof skrollr !== 'undefined') {
      skrollr.init();
    }
  }

  // Smooth scroll
  $("a[href*='#']:not([href='#'])").click(function() {
    if (location.pathname.replace(/^\//, "") === this.pathname.replace(/^\//, "") && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      var offset_top = $(this).data("offset-top") ? $(this).data("offset-top") : 20;

      if (target.length) {
        $("html,body").animate({
          scrollTop: target.offset().top - offset_top
        }, {
          duration: 800
        });
        return false;
      }
    }
  });

  // Team Filters
  $("ul.team-members li").click(function() {
    $(this).toggleClass('active');
  });

  // Dynamic header size
  $(window).resize(function() {
    dynamicResizer();
  });
  dynamicResizer();
});

// Typer initialization
$(function() {
  $('[data-typer-targets]').typer();
});
