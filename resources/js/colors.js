function changeColor() {
  var color = document.getElementById('color').value;
  var invert = findColorInvert(color);
  document.querySelectorAll('.is-primary').forEach((element) => {
    element.style.background = color;
    setChildrenTextColor(element, invert);
  });
}

function setChildrenTextColor(element, color) {
  if (element === undefined) return;

  element.childNodes.forEach((child) => {
    setChildrenTextColor(child, color);
  });

  if (element.style) {
    element.style.color = color;
  }
}

function findColorInvert(color) {
  if (colorLuminance(color) > 0.55) return "rgba(0, 0, 0, 0.7)";
  else return "#FFFFFF";
}

function colorLuminance(color) {
  var c = color.substring(1);      // strip #
  var rgb = parseInt(c, 16);   // convert rrggbb to decimal
  var r = ((rgb >> 16) & 0xff) / 255;  // extract red
  var g = ((rgb >>  8) & 0xff) / 255;  // extract green
  var b = ((rgb >>  0) & 0xff) / 255;  // extract blue

  if (r < 0.03928) r /= 12.92;
  else r = (r + .055) / 1.055;
  r = r ** 2;

  if (g < 0.03928) g /= 12.92;
  else g = (g + .055) / 1.055;
  g = g ** 2;

  if (b < 0.03928) b /= 12.92;
  else b = (b + .055) / 1.055;
  b = b ** 2;

  return 0.2126 * r + 0.7152 * g + 0.0722 * b; // per ITU-R BT.709
}
