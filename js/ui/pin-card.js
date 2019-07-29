'use strict';

(function () {
  var offerTypeToCyrillic = window.import('offerTypeToCyrillic').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');

  var map = document.querySelector('.map');
  var filterContainer = map.querySelector('.map__filters-container');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  var getRemainderOfNum = function (num) {
    if (num % 100 > 19) {
      return num % 10;
    }

    return num % 100;
  };

  var getEndingWords = function (num, nominative, genitiveSingular, genitivePlural) {
    if (getRemainderOfNum(num) === 0 || getRemainderOfNum(num) > 4) {
      return genitivePlural;
    }

    return getRemainderOfNum(num) === 1
      ? nominative
      : genitiveSingular;
  };

  var makeRoomsAndGuests = function (rooms, guests) {
    return rooms
      + ' '
      + getEndingWords(rooms, 'комната', 'комнаты', 'комнат')
      + ' для '
      + guests
      + ' '
      + getEndingWords(guests, 'гостя', 'гостей', 'гостей');
  };

  var createFeature = function (data) {
    var feature = document.createElement('li');
    feature.classList = 'popup__feature popup__feature--' + data;

    return feature;
  };

  var makeFeatureFragment = makeFragmentRender(createFeature);

  var renderFeatures = function (data, element) {
    element.innerHTML = '';

    return data.length > 0
      ? element.appendChild(makeFeatureFragment(data))
      : element.remove();
  };

  var createPhoto = function (data) {
    var cardPhoto = document.createElement('img');
    cardPhoto.src = data;
    cardPhoto.classList.add('popup__photo');
    cardPhoto.width = 45;
    cardPhoto.height = 40;
    cardPhoto.alt = 'Фотография жилья';

    return cardPhoto;
  };

  var makePhotoFragment = makeFragmentRender(createPhoto);

  var renderPhotos = function (data, element) {
    element.innerHTML = '';

    return data.length > 0
      ? element.appendChild(makePhotoFragment(data))
      : element.remove();
  };

  var createCard = function (ad) {
    var card = cardTemplate.cloneNode(true);
    var features = card.querySelector('.popup__features');
    var photos = card.querySelector('.popup__photos');

    card.querySelector('.popup__avatar').src = ad.author.avatar;
    card.querySelector('.popup__title').textContent = ad.offer.title;
    card.querySelector('.popup__text--address').textContent = ad.offer.address;
    card.querySelector('.popup__text--price').textContent = ad.offer.price + ' \u20bd/ночь';
    card.querySelector('.popup__type').textContent = offerTypeToCyrillic[ad.offer.type];
    card.querySelector('.popup__text--capacity').textContent = makeRoomsAndGuests(ad.offer.rooms, ad.offer.guests);
    card.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    card.querySelector('.popup__description').textContent = ad.offer.description;

    renderFeatures(ad.offer.features, features);
    renderPhotos(ad.offer.photos, photos);

    return card;
  };

  var renderCard = function (data) {
    var card = createCard(data);
    map.insertBefore(card, filterContainer);
  };

  window.export({
    renderCard: renderCard,
  }).to('ui.card');
})();
