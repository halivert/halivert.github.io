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

  mobilesizes = {
    'is-size-1-mobile': 'is-size-1',
    'is-size-2-mobile': 'is-size-2',
    'is-size-3-mobile': 'is-size-3',
    'is-size-4-mobile': 'is-size-4',
    'is-size-5-mobile': 'is-size-5',
    'is-size-6-mobile': 'is-size-6',
    'is-size-7-mobile': 'is-size-7',
  };

  normalsizes = {
    'is-size-1': 'is-size-1-mobile',
    'is-size-2': 'is-size-2-mobile',
    'is-size-3': 'is-size-3-mobile',
    'is-size-4': 'is-size-4-mobile',
    'is-size-5': 'is-size-5-mobile',
    'is-size-6': 'is-size-6-mobile',
    'is-size-7': 'is-size-7-mobile',
  };

  if (width < 768) {
    Object.keys(normalsizes).forEach(function(key) {
      var size = `.${key}`;
      document.querySelectorAll(size).forEach(function(it) {
        it.classList.remove(key);
        it.classList.add(normalsizes[key]);
      });
    });
  }
  else {
    Object.keys(mobilesizes).forEach(function(key) {
      var size = `.${key}`;
      document.querySelectorAll(size).forEach(function(it) {
        it.classList.remove(key);
        it.classList.add(mobilesizes[key]);
      });
    });
  }

  let bodyHeight = document.body.clientHeight;
  let windowHeight = window.innerHeight;
  let footerHeight = document.getElementById('footer').clientHeight;

  if (bodyHeight > windowHeight) {
    footer.style.position = 'relative';
  }
  else if (bodyHeight < windowHeight) {
    bodyHeight = windowHeight - footerHeight;
    document.body.style.height = bodyHeight + 'px';
    footer.style.position = 'fixed';
  }
}
