'use strict';

(function () {
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var pins = map.querySelector('.map__pins');
  var mainPin = pins.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var formFields = form.querySelectorAll('.form__element');

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
    window.pins.renderPins(window.data);
  };

  filters.addEventListener('change', function (event) {
    window.pins.remove();
    window.pins.filter(event.target, window.data);
  });

  mainPin.addEventListener('mouseup', addPinsHandler);
})();
