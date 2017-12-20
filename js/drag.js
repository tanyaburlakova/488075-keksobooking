'use strict';

(function () {
  var form = document.querySelector('.notice__form');
  var dragHandler = document.querySelector('.map__pin--main');
  var container = document.querySelector('.map__pinsoverlay').getBoundingClientRect();
  var dragZone = {
    top: 100,
    right: container.width,
    bottom: 500,
    left: container.left,
  };

  dragHandler.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var start = {
      x: event.clientX,
      y: event.clientY,
    };

    var pinMoveHandler = function (moveEvent) {
      moveEvent.preventDefault();

      var sideShift = parseInt(window.getComputedStyle(dragHandler).width, 10) / 2;
      var shift = {
        x: dragHandler.offsetLeft - (start.x - moveEvent.clientX),
        y: dragHandler.offsetTop - (start.y - moveEvent.clientY),
      };

      start = {
        x: moveEvent.clientX,
        y: moveEvent.clientY,
      };

      dragHandler.style.top = Math.min(Math.max((shift.y), dragZone.top), dragZone.bottom) + 'px';
      dragHandler.style.left = Math.min(Math.max((shift.x), dragZone.left + sideShift), dragZone.right - sideShift) + 'px';

      form.elements['address'].value = 'x: ' + moveEvent.clientX + ', y: ' + moveEvent.clientY;
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
