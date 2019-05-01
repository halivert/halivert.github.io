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

function showColorPicker(evt) {
  evt.preventDefault();
  toggleClass(document.getElementById('colorPicker'), "is-invisible");
}

function toggleClass(element, className) {
  if (element.classList) {
    element.classList.toggle(className);
  } else {
    var classes = element.className.split(" ");
    var i = classes.indexOf(className);

    if (i >= 0) classes.splice(i, 1);
    else classes.push(className);
    element.className = classes.join(" ");
  }
}

function changeScreen() {
  let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
  let items;

  document.querySelectorAll('.mobile-separator').forEach(function(it) {
    it.style.display = width < 768 ? 'inline' : 'none';
  });
}
