$(function() {
  cambioPantalla();
  $(window).resize(function() {
    if(this.resizeTO) clearTimeout(this.resizeTO);
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 500);
  });

  $(window).on('resizeEnd', cambioPantalla);
});

function cambioPantalla() {
  let width = $(window).width();
  let items;
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