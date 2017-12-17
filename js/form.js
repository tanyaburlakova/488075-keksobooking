'use strict';

(function () {
  var associatedValues = {
    'type': {
      'linked': 'price',
      'flat': 1000,
      'bungalo': 0,
      'house': 5000,
      'palace': 10000,
    },
    'price': {
      'linked': 'type',
      '0': 'flat',
      '1000': 'bungalo',
      '5000': 'house',
      '100000': 'palace',
    },
    'timein': {
      'linked': 'timeout',
      '12:00': '12:00',
      '13:00': '13:00',
      '14:00': '14:00',
    },
    'timeout': {
      'linked': 'timein',
      '12:00': '12:00',
      '13:00': '13:00',
      '14:00': '14:00',
    },
    'room_number': {
      'linked': 'capacity',
      '1': 1,
      '2': 2,
      '3': 3,
      '100': 0,
    },
  };

  var form = document.querySelector('.notice__form');
  var submit = form.querySelector('.form__submit');

  var getValidGuestNumber = function (roomNumber) {
    var guestNumber = form.querySelector('.capacity');

    for (var i = 0; i < guestNumber.length; i++) {
      var room = parseInt(roomNumber.value, 10);
      var guest = parseInt(guestNumber[i].value, 10);

      guestNumber[i].disabled = true;

      if ((room >= guest && guest !== 0 && room !== 100) ||
          (room === 100 && guest === 0)) {
        guestNumber[i].disabled = false;
      }
    }
  };

  form.addEventListener('change', function (event) {
    var target = event.target;

    if (target.classList.contains('associated-control')) {
      var linkedElement = associatedValues[target.id].linked;
      var linkedValue = associatedValues[target.id][target.value];

      form.querySelector('#' + linkedElement).value = linkedValue;

      if (target.id === 'room_number') {
        getValidGuestNumber(target);
      }
    }

    if (target.validity.valid) {
      target.classList.remove('error');
    }
  });

  submit.addEventListener('click', function (event) {
    for (var i = 0; i < form.elements.length; i++) {
      if (!form.elements[i].validity.valid) {
        form.elements[i].classList.add('error');
        event.preventDefault();
      }
    }
  });
})();
