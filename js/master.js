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

  let windowHeight = window.innerHeight;
  let footerHeight = document.getElementById('footer').clientHeight;
  let mainContainer = document.getElementById('main-container');
  let mainContainerHeight = mainContainer.clientHeight;

  let bodyHeight = mainContainerHeight + footerHeight + 1;
  document.body.style.height = bodyHeight + 'px';

  if (bodyHeight > windowHeight) {
    footer.style.position = 'relative';
  }
  else if (bodyHeight < windowHeight) {
    bodyHeight = windowHeight - footerHeight;
    document.body.style.height = bodyHeight + 'px';
    footer.style.position = 'fixed';
  }
}
