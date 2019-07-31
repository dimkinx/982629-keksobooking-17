'use strict';

(function () {
  var offerTypeEnToRu = window.import('offerTypeEnToRu').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');

  var domRef = window.import('*').from('util.domRef');
  var dom = window.import('*').from('util.dom');
  var isEscapeKey = window.import('isEscapeKey').from('util.predicates');

  (function () {
    var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplateElement.cloneNode(true);
    domRef.mapElement.insertBefore(card, domRef.filterContainerElement);
    dom.hideElement(card);
  })();

  var mapElement = window.import('mapElement').from('util.domRef');
  var pinsContainerElement = mapElement.querySelector('.map__pins');
  var cardElement = domRef.mapElement.querySelector('.map__card');
  var avatarElement = cardElement.querySelector('.popup__avatar');
  var titleElement = cardElement.querySelector('.popup__title');
  var addressElement = cardElement.querySelector('.popup__text--address');
  var priceElement = cardElement.querySelector('.popup__text--price');
  var typeElement = cardElement.querySelector('.popup__type');
  var capacityElement = cardElement.querySelector('.popup__text--capacity');
  var timeElement = cardElement.querySelector('.popup__text--time');
  var descriptionElement = cardElement.querySelector('.popup__description');
  var featuresElement = cardElement.querySelector('.popup__features');
  var photosElement = cardElement.querySelector('.popup__photos');
  var closeElement = cardElement.querySelector('.popup__close');

  var ads = [];

  var initCardAds = function (data) {
    ads = data;
  };

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

  var createFeature = function (name) {
    var feature = document.createElement('li');
    feature.classList = 'popup__feature popup__feature--' + name;

    return feature;
  };

  var getFeatureFragment = makeFragmentRender(createFeature);

  var renderFeatures = function (element, features) {
    element.innerHTML = '';

    if (features.length > 0) {
      element.appendChild(getFeatureFragment(features));
    }
  };

  var createPhoto = function (url) {
    var cardPhoto = document.createElement('img');
    cardPhoto.src = url;
    cardPhoto.classList.add('popup__photo');
    cardPhoto.width = 45;
    cardPhoto.height = 40;
    cardPhoto.alt = 'Фотография жилья';

    return cardPhoto;
  };

  var getPhotoFragment = makeFragmentRender(createPhoto);

  var renderPhotos = function (element, photos) {
    element.innerHTML = '';

    if (photos.length > 0) {
      element.appendChild(getPhotoFragment(photos));
    }
  };

  var updateCard = function (ad) {
    avatarElement.src = ad.author.avatar;
    titleElement.textContent = ad.offer.title;
    addressElement.textContent = ad.offer.address;
    priceElement.textContent = ad.offer.price + ' \u20bd/ночь';
    typeElement.textContent = offerTypeEnToRu[ad.offer.type];
    capacityElement.textContent = makeRoomsAndGuests(ad.offer.rooms, ad.offer.guests);
    timeElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    descriptionElement.textContent = ad.offer.description;

    renderFeatures(featuresElement, ad.offer.features);
    renderPhotos(photosElement, ad.offer.photos);
  };

  var closeCard = function () {
    var activePin = pinsContainerElement.querySelector('.map__pin--active');

    if (activePin !== null) {
      activePin.classList.remove('map__pin--active');
    }

    dom.hideElement(cardElement);
    closeElement.removeEventListener('click', closeElementClickHandler);
    document.removeEventListener('keydown', escPressHandler);
  };

  var closeElementClickHandler = function () {
    closeCard();
  };

  var escPressHandler = function (evt) {
    return isEscapeKey(evt) && closeCard();
  };

  var showCard = function (ad) {
    dom.showElement(cardElement);
    updateCard(ad);

    document.addEventListener('keydown', escPressHandler);
    closeElement.addEventListener('click', closeElementClickHandler);
  };

  var initCard = function (id) {
    var ad = ads[id];

    if (cardElement.classList.contains('hidden')) {
      showCard(ad);
    }

    updateCard(ad);
  };

  window.export({
    initCardAds: initCardAds,
    initCard: initCard,
    closeCard: closeCard,
  }).to('ui.pinCard');
})();
