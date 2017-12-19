'use strict';

(function () {
  var fieldsValues = {
    'type': {
      'linked': 'price',
      'data': ['flat', 'bungalo', 'house', 'palace'],
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

  var validateForm = function () {
    for (var i = 0; i < form.elements.length; i++) {
      if (!form.elements[i].validity.valid) {
        form.elements[i].classList.add('error');
      }
    }
  };

  var syncMutualFields = function (element) {
    var result = fieldsValues[element.id].data.indexOf(element.value);

    return fieldsValues[fieldsValues[element.id].linked].data[result];
  };

  var syncDifferentFields = function (element, linkedElement) {
    var result = fieldsValues[element.id].data.indexOf(element.value);

    for (var i = 0; i < linkedElement.length; i++) {
      var room = parseInt(element.value, 10);
      var guest = parseInt(linkedElement[i].value, 10);

      linkedElement[i].disabled = true;

      if ((room >= guest && guest !== 0 && room !== 100) ||
          (room === 100 && guest === 0)) {
        linkedElement[i].disabled = false;
      }
    }

    return fieldsValues[fieldsValues[element.id].linked].data[result];
  };

  form.addEventListener('change', function (event) {
    var target = event.target;

    var callbacks = {
      'type': syncMutualFields,
      'price': syncMutualFields,
      'timein': syncMutualFields,
      'timeout': syncMutualFields,
      'room_number': syncDifferentFields,
    };

    if (target.classList.contains('associated-control')) {
      var currentElement = form.querySelector('#' + target.id);
      var linkedElement = form.querySelector('#' + fieldsValues[target.id].linked);

      window.synchronizeFields(currentElement, linkedElement, callbacks[target.id]);
    }

    if (target.validity.valid) {
      target.classList.remove('error');
    }
  });

  form.addEventListener('submit', function (event) {
    validateForm();

    window.backend.save(new FormData(form), function (res) {
      form.querySelector('.form__reset').click();
    });

    event.preventDefault();
  });
})();
