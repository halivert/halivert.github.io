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

  window.addEventListener('resizeEnd', changeScreen, false);
});

function changeScreen() {
  let windowHeight = window.innerHeight;
  let footer = document.getElementById('footer');
  let footerHeight = footer.clientHeight;
  let mainContainer = document.getElementById('main-container');
  let mainContainerHeight = mainContainer.clientHeight;
  let bodyHeight = Math.max(document.body.clientHeight,
    mainContainerHeight + footerHeight);

  if (bodyHeight != document.body.clientHeight)
    document.body.style.height = bodyHeight + 'px';

  if (bodyHeight > windowHeight) footer.style.position = 'relative';
  else {
    bodyHeight = windowHeight - footerHeight;
    document.body.style.height = bodyHeight + 'px';
    footer.style.position = 'fixed';
  }

  let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  let items;

  document.querySelectorAll('.mobile-separator').forEach(function(it) {
    it.style.display = width < 768 ? 'inline' : 'none';
  });
}
