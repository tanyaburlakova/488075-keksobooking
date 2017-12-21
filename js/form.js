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

  var checkFields = function (target) {
    var currentElement = form.querySelector('#' + target.id);
    var linkedElement = form.querySelector('#' + fieldsValues[target.id].linked);

    if (target.classList.contains('room-nubmber')) {
      window.synchronizeFields(currentElement, linkedElement, syncDifferentFields);
    } else {
      window.synchronizeFields(currentElement, linkedElement, syncMutualFields);
    }

    if (target.validity.valid) {
      target.classList.remove('error');
    }
  };

  var formInit = function() {
    Array.from(form.elements).forEach(function (item) {
      if (item.classList.contains('linked-control')) {
        checkFields(item);
      }
    });
  };

  formInit();

  form.addEventListener('change', function (event) {
    if (event.target.classList.contains('linked-control')) {
      checkFields(event.target);
    }
  });

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    validateForm();
  });
})();
