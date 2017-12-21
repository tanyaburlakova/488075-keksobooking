'use strict';

(function () {
  var map = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  window.renderPins = function (data) {
    var pins = map.querySelectorAll('.map__pin--similar');

    Array.from(pins).forEach(function (item) {
      item.remove();
    });

    data.forEach(function (item, index) {
      var filters = window.filters;
      var showPin = true;

      if (typeof filters === 'object') {
        // фильтр по параметрам
        for (var key in filters) {
          if (key !== 'features' && key !== 'price' && data[index].offer[key].toString() !== filters[key] && filters[key] !== 'any') {
            showPin = false;
          }
        }

        // фильтр по особенностям
        for (var feature in filters.features) {
          if (data[index].offer.features.indexOf(filters.features[feature]) >= 0) {
            showPin = false;
          }
        }

        // фильтр по цене
        if (typeof filters.price !== 'undefined' && filters.price !== 'any') {
          if (filters.price === 'low' && data[index].offer.price > 10000) {
            showPin = false;
          }

          if (filters.price === 'middle' && (data[index].offer.price <= 10000 || data[index].offer.price >= 50000)) {
            showPin = false;
          }

          if (filters.price === 'high' && data[index].offer.price < 50000) {
            showPin = false;
          }
        }
      }

      if (showPin) {
        var pin = document.createElement('button');
        var pinSize = 40;

        pin.style.left = data[index].location.x - pinSize / 2 + 'px';
        pin.style.top = data[index].location.y - pinSize / 2 + 'px';
        pin.classList = 'map__pin map__pin--similar';
        pin.setAttribute('data-index', index);

        pin.innerHTML = '<img src="' + data[index].author.avatar + '" width="' + pinSize + '" height="' + pinSize + '" draggable="false">';

        fragment.appendChild(pin);
      }
    });

    map.appendChild(fragment);
  };
})();
