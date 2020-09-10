var swiperPrev = document.querySelector('.swiper-button-prev');
var swiperNext = document.querySelector('.swiper-button-next');
var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination'
  }
});