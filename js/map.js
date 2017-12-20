'use strict';

(function () {
  var KEYCODE = {
    enter: 13,
    esc: 27,
  };

  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var mainPin = map.querySelector('.map__pin--main');
  var mapPins = map.querySelector('.map__pins');
  var form = document.querySelector('.notice__form');
  var formFields = form.querySelectorAll('.form__element');
  window.filters = {features: {}};

  var successHandler = function (data) {
    var pinsAddHandler = function () {
      map.classList.remove('map--faded');
      form.classList.remove('notice__form--disabled');
      window.renderPins(data);
      window.renderCards(data);

      formFields.forEach(function (item) {
        item.disabled = false;
      });
    };

    var popupCloseHandler = function (element) {
      var similarPins = map.querySelectorAll('.map__pin--similar');

      element.parentNode.classList.add('hidden');
      window.util.classRemover(similarPins, 'map__pin--active');
    };

    var popupShowHandler = function (index) {
      var cards = map.querySelectorAll('.map__card');

      window.showCard(cards[index], function () {
        var closer = cards[index].querySelector('.popup__close');

        closer.addEventListener('click', function (event) {
          popupCloseHandler(event.target);
        });

        closer.addEventListener('keydown', function (event) {
          if (event.keyCode === KEYCODE.enter) {
            popupCloseHandler(event.target);
          }
        });

        document.addEventListener('keydown', function (event) {
          if (event.keyCode === KEYCODE.esc) {
            popupCloseHandler(event.target);
          }
        });
      });
    };

    var addPinActiveStateHandler = function (current, index) {
      var similarPins = map.querySelectorAll('.map__pin--similar');
      var cards = map.querySelectorAll('.map__card');

      window.util.classRemover(similarPins, 'map__pin--active');
      window.util.classAdder(cards, 'hidden');
      popupShowHandler(index);
      current.classList.add('map__pin--active');
    };

    filters.addEventListener('change', function (event) {
      var id = event.target.id.replace('housing-', '').replace('filter-', '');

      if (event.target.type === 'checkbox') {
        window.filters['features'][id] = event.target.value;

        if (!event.target.checked) {
          delete window.filters['features'][id];
        }
      } else {
        window.filters[id] = event.target.value;
      }

      window.renderPins(data);
    });

    mainPin.addEventListener('mouseup', pinsAddHandler);

    mapPins.addEventListener('click', function (event) {
      var target = event.target.parentNode;
      var index = target.getAttribute('data-index');

      if (target.classList.contains('map__pin--similar')) {
        addPinActiveStateHandler(target, index);
      }
    });

    mapPins.addEventListener('keydown', function (event) {
      var target = event.target;
      var index = target.getAttribute('data-index');

      if (target.classList.contains('map__pin--similar') && event.keyCode === KEYCODE.enter) {
        addPinActiveStateHandler(target, index);
      }
    });
  };

  window.backend.load(successHandler, window.handlers.errorHandler);
})();
