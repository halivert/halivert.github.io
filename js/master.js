document.addEventListener('DOMContentLoaded', function(event) {
  let resizeEnd = new Event('resizeEnd');

  changeScreen();

  window.addEventListener('resize', function(event) {
    if (window.resizeTO) {
      clearTimeout(window.resizeTO);
    }
    window.resizeTO = setTimeout(function() {
      window.dispatchEvent(resizeEnd);
    }, 50);
  });

  changeFooterPosition();

  window.addEventListener('resizeEnd', changeScreen, false);
});

function changeFooterPosition() {
  let commentsHeight =
    typeof hasComments !== 'undefined' ? (hasComments ? 400 : 0) : 0;

  let bodyHeight = document.body.clientHeight;
  let windowHeight = window.innerHeight;
  let footer = document.getElementById('footer');

  if (bodyHeight + commentsHeight > windowHeight) {
    footer.style.position = 'relative';
  }
  else {
    footer.style.position = 'fixed';
  }
}

function changeScreen() {
  changeFooterPosition();
  let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  let items;

  document.querySelectorAll('.mobile-separator').forEach(function(it) {
    it.style.display = width < 768 ? 'inline' : 'none';
  });

  if (width < 768) {
    document.querySelectorAll('.is-size-1').forEach(function(it) {
      it.classList.remove('is-size-1');
      it.classList.add('is-size-2-mobile');
    });

    document.querySelectorAll('.is-size-5').forEach(function(it) {
      it.classList.remove('is-size-5');
      it.classList.add('is-size-5-mobile');
    });
  }
  else {
    let size2mob = '.is-size-2-mobile';
    document.querySelectorAll(size2mob).forEach(function(it) {
      it.classList.remove('is-size-2-mobile');
      it.classList.add('is-size-1');
    });

    let size5mob = '.is-size-5-mobile';
    document.querySelectorAll(size5mob).forEach(function(it) {
      it.classList.remove('is-size-5');
      it.classList.add('is-size-5-mobile');
    });
  }
}
