'use strict';

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
var similarAds = [];

var mapPoints = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();
var mapCardTemplate = document.querySelector('.map-elements-template').content.querySelector('.map__card');
var mapCards = document.querySelector('.map');

var randomNumber = function (max, min) {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

var randomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var randomLengthArray = function (array) {
  var ramdomArray = [];
  var arrayLength = randomNumber(array.length - 1, 1);

  while (ramdomArray.length < arrayLength) {
    var newElem = randomItem(array);
    if (ramdomArray.indexOf(newElem) === -1) {
      ramdomArray.push(newElem);
    }
  }

  return ramdomArray;
};

for (var i = 0; i < 8; i++) {
  var apartment = {
    'author': {
      'avatar': 'img/avatars/user0' + (i + 1) + '.png',
    },

    'offer': {
      'title': randomItem(APARTMENTS_DESCRIPTION),
      'price': randomNumber(1000000, 1000),
      'type': randomItem(APARTMENTS_TYPE),
      'rooms': randomNumber(5, 1),
      'guests': randomNumber(20, 1),
      'checkin': randomItem(CHECK_TIMES),
      'checkout': randomItem(CHECK_TIMES),
      'features': randomLengthArray(APARTMENTS_FEATURES),
      'description': '',
      'photos': [],
    },

    'location': {
      'x': randomNumber(900, 300),
      'y': randomNumber(500, 100),
    },
  };

  apartment.offer.address = apartment.location.x + ', ' + apartment.location.y;

  similarAds.push(apartment);
}

for (var pin = 0; pin < similarAds.length; pin++) {
  var button = document.createElement('button');
  var buttonSize = 40;

  button.style.left = similarAds[pin].location.x - buttonSize / 2 + 'px';
  button.style.top = similarAds[pin].location.y - buttonSize / 2 + 'px';
  button.classList = 'map__pin map__pin--similar hidden';

  button.innerHTML = '<img src="' + similarAds[pin].author.avatar + '" width="' + buttonSize + '" height="' + buttonSize + '" draggable="false">';

  fragment.appendChild(button);
}

mapPoints.appendChild(fragment);

var renderMapCards = function (card) {
  var mapElement = mapCardTemplate.cloneNode(true);
  var apartmentFuturiesList = mapElement.querySelector('.popup__features');
  apartmentFuturiesList.innerHTML = '';

  mapElement.querySelector('.popup__avatar').src = card.author.avatar;
  mapElement.getElementsByTagName('h3')[0].textContent = card.offer.title;
  mapElement.querySelector('.popup__price').innerHTML = card.offer.price + '&#x20bd;/ночь';
  mapElement.getElementsByTagName('h4')[0].textContent = card.offer.type;
  mapElement.getElementsByTagName('p')[0].textContent = card.offer.rooms + ' для ' + card.offer.guests + ' гостей';
  mapElement.getElementsByTagName('p')[2].textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  mapElement.getElementsByTagName('p')[3].textContent = card.offer.description;
  mapElement.classList.add('hidden');

  for (var feature = 0; feature < card.offer.features.length; feature++) {
    var listElem = document.createElement('li');

    listElem.classList = 'feature feature--' + card.offer.features[feature];

    apartmentFuturiesList.appendChild(listElem);
  }

  apartmentFuturiesList.replaceWith(apartmentFuturiesList);

  return mapElement;
};

for (var card = 0; card < similarAds.length; card++) {
  fragment.appendChild(renderMapCards(similarAds[card]));
}

mapCards.insertBefore(fragment, document.querySelector('.map__filters-container'));

var KEYCODE = {
  enter: 13,
  esc: 27,
};

var mainPoint = mapCards.querySelector('.map__pin--main');
var similarPins = mapCards.querySelectorAll('.map__pin--similar');
var popups = mapCards.querySelectorAll('.map__card');

var adsForm = document.querySelector('.notice__form');
var adsFormFieldsets = adsForm.querySelectorAll('.form__element');

var classRemover = function (arr, className) {
  arr.forEach(function (item) {
    item.classList.remove(className);
  });
};

var classAdder = function (arr, className) {
  arr.forEach(function (item) {
    item.classList.add(className);
  });
};

var pointsAddHandler = function () {
  mapCards.classList.remove('map--faded');
  adsForm.classList.remove('notice__form--disabled');
  classRemover(similarPins, 'hidden');

  adsFormFieldsets.forEach(function (item) {
    item.disabled = false;
  });
};

mainPoint.addEventListener('mouseup', pointsAddHandler);

var popupShowHandler = function (index) {
  var popupCloser = popups[index].querySelector('.popup__close');

  var popupCloseHandler = function () {
    popupCloser.parentNode.classList.add('hidden');
    classRemover(similarPins, 'map__pin--active');
  };

  classAdder(popups, 'hidden');
  popups[index].classList.remove('hidden');

  popupCloser.addEventListener('click', popupCloseHandler);

  popupCloser.addEventListener('keydown', function (event) {
    if (event.keyCode === KEYCODE.enter) {
      popupCloseHandler();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.keyCode === KEYCODE.esc) {
      popupCloseHandler();
    }
  });
};

var showActiveStateHandler = function (item, index) {
  classRemover(similarPins, 'map__pin--active');
  popupShowHandler(index);
  item.classList.add('map__pin--active');
};

similarPins.forEach(function (item, index) {
  item.addEventListener('click', function () {
    showActiveStateHandler(item, index);
  });

  item.addEventListener('keydown', function (event) {
    if (event.keyCode === KEYCODE.enter) {
      showActiveStateHandler(item, index);
    }
  });
});


var formElm = adsForm.querySelectorAll('.associated-control');
var submitButton = adsForm.querySelector('.form__submit');

var associatedValues = {
  'type': {
    'target': 'price',
    'flat': 1000,
    'bungalo': 0,
    'house': 5000,
    'palace': 10000,
  },
  'price': {
    'target': 'type',
    '0': 'flat',
    '1000': 'bungalo',
    '5000': 'house',
    '100000': 'palace',
  },
  'timein': {
    'target': 'timeout',
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  },
  'timeout': {
    'target': 'timein',
    '12:00': '12:00',
    '13:00': '13:00',
    '14:00': '14:00',
  },
  'room_number': {
    'target': 'capacity',
    '1': 1,
    '2': 2,
    '3': 3,
    '100': 0,
  },
};

for (var element = 0; element < formElm.length; element++) {
  formElm[element].addEventListener('change', function (event) {
    var current = associatedValues[event.target.id].target;
    var currentVal = associatedValues[event.target.id][event.target.value];
    adsForm.querySelector('#' + current).value = currentVal;

    if (event.target.id === 'room_number') {
      var capacity = adsForm.querySelector('.capacity');

      for (var option = 0; option < capacity.length; option++) {
        var targetVal = parseInt(event.target.value, 10);
        var optionVal = parseInt(capacity[option].value, 10);

        capacity[option].disabled = true;

        if ((targetVal >= optionVal && optionVal !== 0 && targetVal !== 100) ||
            (targetVal === 100 && optionVal === 0)) {
          capacity[option].disabled = false;
        }
      }
    }

    if (event.target.validity.valid) {
      event.target.classList.remove('error');
    }
  });
}

submitButton.addEventListener('click', function (event) {
  for (var input = 0; input < formElm.length; input++) {
    if (!formElm[input].validity.valid) {
      formElm[input].classList.add('error');
      event.preventDefault();
    }
  }
});

