'use strict';

(function () {
  var KEYCODE = {
    enter: 13,
    esc: 27,
  };

  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var pins = map.querySelector('.map__pins');
  var mainPin = pins.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formFields = form.querySelectorAll('.form__element');
  window.filters = {features: {}};

  window.backend.load(window.handlers.successHandler, window.handlers.errorHandler);

  var enableFormFields = function () {
    form.classList.remove('notice__form--disabled');
    formFields.forEach(function (item) {
      item.disabled = false;
    });
  };

  var activateForm = function () {
    map.classList.remove('map--faded');
    enableFormFields();
  };

  var addPinsHandler = function () {
    activateForm();
    window.pin.renderPins(window.data);
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

    window.pin.renderPins(window.data);
  });

  pins.addEventListener('click', function (event) {
    var target = event.target.parentNode;

    if (target.classList.contains('map__pin--similar')) {
      window.pin.removePinActiveStateHandler();
      window.pin.addPinActiveStateHandler(target);
    }
  });

  pins.addEventListener('keydown', function (event) {
    var target = event.target;

    if (target.classList.contains('map__pin--similar') && event.keyCode === KEYCODE.enter) {
      window.pin.removePinActiveStateHandler();
      window.pin.addPinActiveStateHandler(target);
    }
  });

  mainPin.addEventListener('mouseup', addPinsHandler);
})();
