'use strict';

(function () {
  var PIN_HEIGHT = 65;
  var form = document.querySelector('.notice__form');
  var dragElement = document.querySelector('.map__pin--main');
  var container = document.querySelector('.map__pinsoverlay').getBoundingClientRect();
  var dragZone = {
    top: 100,
    right: container.width,
    bottom: 500,
  };

  dragElement.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var start = {
      x: event.clientX,
      y: event.clientY,
    };

    var pinMoveHandler = function (moveEvent) {
      moveEvent.preventDefault();

      var sideShift = parseInt(window.getComputedStyle(dragElement).width, 10) / 2;
      var shift = {
        x: dragElement.offsetLeft - (start.x - moveEvent.clientX),
        y: dragElement.offsetTop - (start.y - moveEvent.clientY),
      };

      start = {
        x: moveEvent.clientX,
        y: moveEvent.clientY,
      };

      dragElement.style.top = Math.min(Math.max((shift.y), dragZone.top), dragZone.bottom) + 'px';
      dragElement.style.left = Math.min(Math.max((shift.x), sideShift), dragZone.right - sideShift) + 'px';

      form.elements['address'].value = 'x: ' + dragElement.offsetLeft + ', y: ' + (dragElement.offsetTop + PIN_HEIGHT);
    };

    var pinDropHandler = function (upEvent) {
      upEvent.preventDefault();

      document.removeEventListener('mousemove', pinMoveHandler);
      document.removeEventListener('mouseup', pinDropHandler);
    };

    document.addEventListener('mousemove', pinMoveHandler);
    document.addEventListener('mouseup', pinDropHandler);
  });
})();
