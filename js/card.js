'use strict';

(function () {
  var fragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('.map-elements-template').content.querySelector('.popup');
  var map = document.querySelector('.map');

  var generateCard = function (data) {
    var card = cardTemplate.cloneNode(true);
    var apartmentFuturesList = card.querySelector('.popup__features');
    var apartmentPicturesList = card.querySelector('.popup__pictures');
    var apartmentPicturesListItem = apartmentPicturesList.querySelector('.popup__pictures-item');

    var apartmentTypes = {
      'bungalo': 'Лачуга',
      'flat': 'Квартира',
      'house': 'Дом',
      'palace': 'Дворец',
    };

    card.querySelector('.popup__avatar').src = data.author.avatar;
    card.getElementsByTagName('h3')[0].textContent = data.offer.title;
    card.querySelector('.popup__price').textContent = data.offer.price + ' ₽/ночь';
    card.getElementsByTagName('h4')[0].textContent = apartmentTypes[data.offer.type];
    card.getElementsByTagName('p')[0].textContent = data.offer.rooms + ' для ' + data.offer.guests + ' гостей';
    card.getElementsByTagName('p')[2].textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    card.getElementsByTagName('p')[3].textContent = data.offer.description;
    apartmentPicturesList.innerHTML = '';
    apartmentFuturesList.innerHTML = '';

    data.offer.photos.forEach(function (item) {
      var imageStyles = {
        width: '60px',
        indents: '5px'
      };
      var element = apartmentPicturesListItem.cloneNode(true);
      var image = element.querySelector('.popup__pictures-image');

      image.src = item;
      image.style.width = imageStyles.width;
      image.style.margin = imageStyles.indents;

      apartmentPicturesList.appendChild(element);
    });

    data.offer.features.forEach(function (item, index) {
      var feature = document.createElement('li');

      feature.classList = 'feature feature--' + data.offer.features[index];

      apartmentFuturesList.appendChild(feature);
    });

    card.querySelector('.popup__close').addEventListener('click', cardActionHandler);
    document.addEventListener('keydown', cardActionHandler);

    return card;
  };

  var cardActionHandler = function (event) {
    var card = document.querySelector('.popup');

    if ((card && event.keyCode === window.KEY_CODE.ESCAPE) || event.type === 'click') {
      card.querySelector('.popup__close').addEventListener('click', cardActionHandler);
      window.card.remove();
      window.pins.removeActiveState();
    }
  };

  window.card = {
    render: function (data) {
      fragment.appendChild(generateCard(data));

      map.insertBefore(fragment, document.querySelector('.map__filters-container'));
    },

    remove: function () {
      var card = map.querySelector('.popup');

      card.remove();
    }
  };
})();
