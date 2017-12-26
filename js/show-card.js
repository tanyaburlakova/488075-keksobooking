'use strict';

(function () {
  var KEYCODE = {
    enter: 13,
    esc: 27,
  };

  window.card = {
    show: function (data) {
      window.renderCard(data);
      window.card.addEvents();
    },

    remove: function () {
      var card = document.querySelector('.map__card');

      card.remove();
    },

    addEvents: function () {
      var card = document.querySelector('.map__card');

      card.addEventListener('click', window.pin.removePinActiveStateHandler);

      card.addEventListener('keydown', function (event) {
        if (event.keyCode === KEYCODE.enter) {
          window.pin.removePinActiveStateHandler();
        }
      });

      document.addEventListener('keydown', function (event) {
        if (event.keyCode === KEYCODE.esc) {
          window.pin.removePinActiveStateHandler();
        }
      });
    },
  };
})();
