'use strict';

(function () {
  var fieldsValues = {
    'type': {
      'linked': 'price',
      'data': ['bungalof', 'flat', 'house', 'palace'],
    },
    'price': {
      'linked': 'type',
      'data': ['0', '1000', '5000', '100000'],
    },
    'timein': {
      'linked': 'timeout',
      'data': ['12:00', '13:00', '14:00'],
    },
    'timeout': {
      'linked': 'timein',
      'data': ['12:00', '13:00', '14:00'],
    },
    'room_number': {
      'linked': 'capacity',
      'data': ['1', '2', '3', '100'],
    },
    'capacity': {
      'linked': 'room_number',
      'data': ['1', '2', '3', '0'],
    },
  };

  var form = document.querySelector('.notice__form');
  var title = form.elements['title'];
  var address = form.elements['address'];

  var syncMutualFields = function (element, data) {
    element.value = data;
  };

  var syncDifferentFields = function (element, data) {
    var currentElement = form.querySelector('.room-nubmber');

    for (var i = 0; i < element.length; i++) {
      var room = parseInt(currentElement.value, 10);
      var guest = parseInt(element[i].value, 10);

      element[i].disabled = true;

      if ((room >= guest && guest !== 0 && room !== 100) ||
          (room === 100 && guest === 0)) {
        element[i].disabled = false;
      }
    }

    element.value = data;
  };

  var checkFields = function (target) {
    var currentElement = form.querySelector('#' + target.id);
    var linkedElement = form.querySelector('#' + fieldsValues[target.id].linked);

    if (target.classList.contains('room-nubmber')) {
      window.synchronizeFields(currentElement, linkedElement, fieldsValues, syncDifferentFields);
    } else {
      window.synchronizeFields(currentElement, linkedElement, fieldsValues, syncMutualFields);
    }
  };

  var formInit = function () {
    Array.from(form.elements).forEach(function (item) {
      if (item.classList.contains('linked-control')) {
        checkFields(item);
      }
    });

    address.value = 'x: 600, y: 430';
  };

  var addError = function (field) {
    field.classList.add('error');
  };

  var removeError = function (field) {
    field.classList.remove('error');
  };

  var checkTitleValidity = function () {
    addError(title);

    if (title.validity.valid) {
      removeError(title);
    }
  };

  var successHandler = function () {
    form.reset();
    formInit();
  };

  formInit();

  title.addEventListener('invalid', checkTitleValidity);
  title.addEventListener('blur', checkTitleValidity);
  title.addEventListener('focus', checkTitleValidity);

  form.addEventListener('change', function (event) {
    if (event.target.classList.contains('linked-control')) {
      checkFields(event.target);
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.save(new FormData(form), successHandler, window.handlers.errorHandler);
  });
})();
