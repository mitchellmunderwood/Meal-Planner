window.mdc.autoInit();

var drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));

var button = document.querySelector('#button');
mdc.ripple.MDCRipple.attachTo(button);
button.addEventListener('click', function() {
  drawer.open = true;
});