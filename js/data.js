'use strict';

(function () {
  var APARTMENTS_DESCRIPTION = [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде',
  ];
  var APARTMENTS_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner',
  ];
  var CHECK_TIMES = [
    '12:00',
    '13:00',
    '14:00',
  ];
  var APARTMENTS_TYPE = [
    'flat',
    'house',
    'bungalo',
  ];

  var apartments = [];

  window.data = {
    apartmentsData: function () {
      for (var i = 0; i < APARTMENTS_DESCRIPTION.length; i++) {
        var item = {
          'author': {
            'avatar': 'img/avatars/user0' + (i + 1) + '.png',
          },

          'offer': {
            'title': window.util.randomItem(APARTMENTS_DESCRIPTION),
            'price': window.util.randomNumber(1000000, 1000),
            'type': window.util.randomItem(APARTMENTS_TYPE),
            'rooms': window.util.randomNumber(5, 1),
            'guests': window.util.randomNumber(20, 1),
            'checkin': window.util.randomItem(CHECK_TIMES),
            'checkout': window.util.randomItem(CHECK_TIMES),
            'features': window.util.randomLengthArray(APARTMENTS_FEATURES),
            'description': '',
            'photos': [],
          },

          'location': {
            'x': window.util.randomNumber(900, 300),
            'y': window.util.randomNumber(500, 100),
          },
        };

        item.offer.address = item.location.x + ', ' + item.location.y;

        apartments.push(item);
      }

      return apartments;
    }
  };
})();
