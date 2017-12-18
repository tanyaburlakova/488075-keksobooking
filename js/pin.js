'use strict';

(function () {
  var map = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.renderPins = function (apartments) {
    apartments.forEach(function (item, index) {
      var pin = document.createElement('button');
      var pinSize = 40;

      pin.style.left = apartments[index].location.x - pinSize / 2 + 'px';
      pin.style.top = apartments[index].location.y - pinSize / 2 + 'px';
      pin.classList = 'map__pin map__pin--similar hidden';
      pin.setAttribute('data-index', index);

      pin.innerHTML = '<img src="' + apartments[index].author.avatar + '" width="' + pinSize + '" height="' + pinSize + '" draggable="false">';

      fragment.appendChild(pin);
    });

    map.appendChild(fragment);
  };
})();
