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

  mainPin.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var target = event.target;
    var container = map.querySelector('.map__pinsoverlay').getBoundingClientRect();
    var dragZone = {
      top: 100,
      right: container.width,
      bottom: 500,
      left: container.left,
    };
    var startX = event.clientX;
    var startY = event.clientY;

    var pinMoveHandler = function (moveEvent) {
      moveEvent.preventDefault();

      var tempX = moveEvent.clientX;
      var tempY = moveEvent.clientY;

      if (tempY < dragZone.top) {
        mainPin.style.top = dragZone.top + 'px';
      } else if (tempY > dragZone.bottom - target.height) {
        mainPin.style.top = dragZone.bottom - target.height + 'px';
      } else {
        mainPin.style.top = startY + ( tempY - startY )  + 'px';
      }

      if (dragZone.left + tempX  < target.width) {
        mainPin.style.left = target.width + 'px';
      } else if (tempX > dragZone.right - target.width) {
        mainPin.style.left = dragZone.right - target.width + 'px';
      } else {
        mainPin.style.left = startX + ( tempX - startX ) + 'px';
      }

      form.elements['address'].value = 'x: ' + tempX + ', y: ' + tempY;
    }

    var pinDropHandler = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinDropHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinDropHandler);
  });


})();


