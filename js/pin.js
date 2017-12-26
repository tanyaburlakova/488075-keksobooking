'use strict';

(function () {
  var map = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var filters = {
    features: {}
  };

  var createPin = function (data, index) {
    var pin = document.createElement('button');
    var pinSize = 40;

    pin.style.left = data.location.x - pinSize / 2 + 'px';
    pin.style.top = data.location.y - pinSize / 2 + 'px';
    pin.classList = 'map__pin map__pin--similar';
    pin.dataset.index = index;

    pin.innerHTML = '<img src="' + data.author.avatar + '" width="' + pinSize + '" height="' + pinSize + '" draggable="false">';
    pin.addEventListener('click', pinClickHandler);
    pin.addEventListener('click', pinKeydownHandler);

    fragment.appendChild(pin);
  };

  var pinClickHandler = function (event) {
    var target = event.currentTarget;
    var index = target.dataset.index;

    if (map.querySelector('.map__pin--active')) {
      window.pins.removeActiveState();
      window.card.remove();
    }
    window.pins.addActiveState(target);
    window.card.render(window.data[index]);
  };

  var pinKeydownHandler = function (event) {
    if (event.keyCode === window.KEY_CODE.ENTER) {
      window.card.render(window.data[index]);
    }
  };

  var generateFilter = function (current) {
    var id = current.id.replace('housing-', '').replace('filter-', '');

    if (current.type === 'checkbox') {
      filters['features'][id] = current.value;

      if (!current.checked) {
        delete filters['features'][id];
      }
    } else {
      filters[id] = current.value;
    }

    return filters;
  };

  window.pins = {
    render: function (data) {
      data.forEach(function (item, index) {
        createPin(data[index], index);
      });

      map.appendChild(fragment);
    },

    addActiveState: function (current) {
      current.classList.add('map__pin--active');
    },

    removeActiveState: function () {
      var activePin = document.querySelector('.map__pin--active');

      activePin.classList.remove('map__pin--active');
    },

    remove: function () {
      var pins = map.querySelectorAll('.map__pin--similar');

      Array.from(pins).forEach(function (item) {
        item.remove();
      });
    },

    filter: function (current, data) {
      var newData = [];

      generateFilter(current);

      data.forEach(function (item, index) {
        // фильтр по параметрам
        for (var key in filters) {
          if (key !== 'features' && key !== 'price' && data[index].offer[key].toString() !== filters[key] && filters[key] !== 'any') {
            return false;
          }
        }

        // фильтр по особенностям
        for (var feature in filters.features) {
          if (item.offer.features.indexOf(filters.features[feature]) >= 0) {
            return false;
          }
        }

        // фильтр по цене
        if (filters.price !== 'any') {
          if (filters.price === 'low' && data[index].offer.price > 10000) {
            return false;
          }

          if (filters.price === 'middle' && (data[index].offer.price <= 10000 || data[index].offer.price >= 50000)) {
            return false;
          }

          if (filters.price === 'high' && data[index].offer.price < 50000) {
            return false;
          }
        }

        newData.push(item);

        return newData;
      });

      window.pins.render(newData);
    },
  };
})();
