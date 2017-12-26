'use strict';

(function () {
  var map = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var createPin = function (data, index) {
    var pin = document.createElement('button');
    var pinSize = 40;

    pin.style.left = data.location.x - pinSize / 2 + 'px';
    pin.style.top = data.location.y - pinSize / 2 + 'px';
    pin.classList = 'map__pin map__pin--similar';
    pin.dataset.index = index;

    pin.innerHTML = '<img src="' + data.author.avatar + '" width="' + pinSize + '" height="' + pinSize + '" draggable="false">';

    fragment.appendChild(pin);
  };

  window.pin = {
    renderPins: function (data) {
      var pins = map.querySelectorAll('.map__pin--similar');

      Array.from(pins).forEach(function (item) {
        item.remove();
      });

      data.forEach(function (item, index) {
        var filters = window.filters;
        var showPin = true;

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
        if (filters.price !== 'any') {
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

        if (showPin) {
          createPin(data[index], index);
        }
      });

      map.appendChild(fragment);
    },

    addPinActiveStateHandler: function (current) {
      var index = current.dataset.index;

      current.classList.add('map__pin--active');
      window.card.show(window.data[index]);
    },

    removePinActiveStateHandler: function () {
      if (map.querySelector('.map__pin--active')) {
        var pinActive = document.querySelector('.map__pin--active');

        pinActive.classList.remove('map__pin--active');
        window.card.remove();
      }
    },
  };
})();
