'use strict';

(function () {
  var apartments = window.data.apartmentsData();

  window.renderPins(apartments);
  window.renderCards(apartments);

  var KEYCODE = {
    enter: 13,
    esc: 27,
  };

  var map = document.querySelector('.map');
  var mainPin = map.querySelector('.map__pin--main');
  var similarPins = map.querySelectorAll('.map__pin--similar');
  var popups = map.querySelectorAll('.map__card');

  var form = document.querySelector('.notice__form');
  var formFields = form.querySelectorAll('.form__element');

  var pinsAddHandler = function () {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    window.util.classRemover(similarPins, 'hidden');

    formFields.forEach(function (item) {
      item.disabled = false;
    });
  };

  var popupCloseHandler = function (element) {
    element.parentNode.classList.add('hidden');
    window.util.classRemover(similarPins, 'map__pin--active');
  };

  var popupShowHandler = function (index) {
    var closer = popups[index].querySelector('.popup__close');

    window.util.classAdder(popups, 'hidden');
    popups[index].classList.remove('hidden');

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
  };

  var addPinActiveStateHandler = function (current, index) {
    window.util.classRemover(similarPins, 'map__pin--active');
    popupShowHandler(index);
    current.classList.add('map__pin--active');
  };

  mainPin.addEventListener('mouseup', pinsAddHandler);

  similarPins.forEach(function (item, index) {
    item.addEventListener('click', function () {
      addPinActiveStateHandler(item, index);
    });

    item.addEventListener('keydown', function (event) {
      if (event.keyCode === KEYCODE.enter) {
        addPinActiveStateHandler(item, index);
      }
    });
  });
})();


