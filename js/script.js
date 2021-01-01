$(function() {
	var width = $(window).width();
  $(window).resize(function() {
		if (width >= 992 && width <= 1199 && $(window).width() >=1200) {
			if (document.querySelector('.side-bar').classList.contains('active')){
				$('.side-bar').toggleClass('active');
		    $('.main-content').toggleClass('active');
			}
		}
		else if ($(window).width() >= 992 && $(window).width() <= 1199 && width >=1200) {
			if (document.querySelector('.side-bar').classList.contains('active')){
				$('.side-bar').toggleClass('active');
		    $('.main-content').toggleClass('active');
			}
		}
  	width = $(window).width();
  });
  $('#hamburger-btn').on('click', function() {
    $('.side-bar').toggleClass('active');
    $('.main-content').toggleClass('active');
  });
});
