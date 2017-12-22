$(function() {
  cambioPantalla();
  $(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 50);
  });

  console.log($('#footer').css('height'));
  console.log($('#footer-hr').css('height'));
  if ($(document).height() > $(window).height()) {
    $('#footer').css('position', 'relative');
  }
  else {
    $('#footer').css('position', 'fixed');
  }

  $(window).on('resizeEnd', cambioPantalla);
});

function cambioPantalla() {
  let width = $(window).width();
  let items;

  $('.mobile-separator').attr('hidden', width >= 768);
  if (width < 768) {
    $('.is-size-1').each(function() {
      $(this).removeClass('is-size-1');
      $(this).addClass('is-size-2-mobile');
    });

    $('.is-size-5').each(function() {
      $(this).removeClass('is-size-5');
      $(this).addClass('is-size-5-mobile');
    });
  }
  else {
    $('.is-size-2-mobile').each(function() {
      $(this).removeClass('is-size-2-mobile');
      $(this).addClass('is-size-1');
    });

    $('.is-size-5-mobile').each(function() {
      $(this).addClass('is-size-5');
      $(this).removeClass('is-size-5-mobile');
    });
  }
}