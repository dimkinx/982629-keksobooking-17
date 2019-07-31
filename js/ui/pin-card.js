'use strict';

(function () {
  var offerTypeEnToRu = window.import('offerTypeEnToRu').from('types');
  var makeFragmentRender = window.import('makeFragmentRender').from('util.factories');
  var isEscapeKey = window.import('isEscapeKey').from('util.predicates');
  var domRef = window.import('*').from('util.domRef');
  var dom = window.import('*').from('util.dom');

  var createCard = function () {
    var cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
    var card = cardTemplateElement.cloneNode(true);
    domRef.mapElement.insertBefore(card, domRef.filterContainerElement);
    dom.hideElement(card);
  };

  createCard();

  var pinsContainerElement = domRef.mapElement.querySelector('.map__pins');
  var cardArticleElement = domRef.mapElement.querySelector('.map__card');
  var avatarImgElement = cardArticleElement.querySelector('.popup__avatar');
  var titleTitleElement = cardArticleElement.querySelector('.popup__title');
  var addressTextElement = cardArticleElement.querySelector('.popup__text--address');
  var priceTextElement = cardArticleElement.querySelector('.popup__text--price');
  var typeTitleElement = cardArticleElement.querySelector('.popup__type');
  var capacityTextElement = cardArticleElement.querySelector('.popup__text--capacity');
  var timeTextElement = cardArticleElement.querySelector('.popup__text--time');
  var descriptionTextElement = cardArticleElement.querySelector('.popup__description');
  var featuresListElement = cardArticleElement.querySelector('.popup__features');
  var photosContainerElement = cardArticleElement.querySelector('.popup__photos');
  var closeButtonElement = cardArticleElement.querySelector('.popup__close');

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

    return (getRemainderOfNum(num) === 1)
      ? nominative
      : genitiveSingular;
  };

  var getCapacityContent = function (ad) {
    return ad.offer.rooms
      + ' '
      + getEndingWords(ad.offer.rooms, 'комната', 'комнаты', 'комнат')
      + ' для '
      + ad.offer.guests
      + ' '
      + getEndingWords(ad.offer.guests, 'гостя', 'гостей', 'гостей');
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
    var cardImgPhoto = document.createElement('img');
    cardImgPhoto.src = url;
    cardImgPhoto.classList.add('popup__photo');
    cardImgPhoto.width = 45;
    cardImgPhoto.height = 40;
    cardImgPhoto.alt = 'Фотография жилья';

    return cardImgPhoto;
  };

  var getPhotoFragment = makeFragmentRender(createPhoto);

  var renderPhotos = function (element, photos) {
    element.innerHTML = '';

    if (photos.length > 0) {
      element.appendChild(getPhotoFragment(photos));
    }
  };

  var updateCard = function (ad) {
    avatarImgElement.src = ad.author.avatar;
    titleTitleElement.textContent = ad.offer.title;
    addressTextElement.textContent = ad.offer.address;
    priceTextElement.textContent = ad.offer.price + ' \u20bd/ночь';
    typeTitleElement.textContent = offerTypeEnToRu[ad.offer.type];
    capacityTextElement.textContent = getCapacityContent(ad);
    timeTextElement.textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до: ' + ad.offer.checkout;
    descriptionTextElement.textContent = ad.offer.description;

    renderFeatures(featuresListElement, ad.offer.features);
    renderPhotos(photosContainerElement, ad.offer.photos);
  };

  var closeCard = function () {
    var activePinElement = pinsContainerElement.querySelector('.map__pin--active');

    if (activePinElement !== null) {
      activePinElement.classList.remove('map__pin--active');
    }

    dom.hideElement(cardArticleElement);
    closeButtonElement.removeEventListener('click', closeElementClickHandler);
    document.removeEventListener('keydown', escPressHandler);
  };

  var closeElementClickHandler = function () {
    closeCard();
  };

  var escPressHandler = function (evt) {
    return isEscapeKey(evt) && closeCard();
  };

  var showCard = function (ad) {
    dom.showElement(cardArticleElement);
    updateCard(ad);

    document.addEventListener('keydown', escPressHandler);
    closeButtonElement.addEventListener('click', closeElementClickHandler);
  };

  var pinClickHandler = function (id) {
    var ad = ads[+id];

    if (!cardArticleElement.classList.contains('hidden')) {
      updateCard(ad);
    }

    showCard(ad);
  };

  window.export({
    initCardAds: initCardAds,
    pinClickHandler: pinClickHandler,
    closeCard: closeCard,
  }).to('ui.pinCard');
})();
