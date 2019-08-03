'use strict';

(function () {
  var PIN_MAX = window.import('PIN_MAX').from('constants');
  var dom = window.import('*').from('util.dom');
  var domRef = window.import('*').from('util.domRef');

  var renderPins = window.import('renderPins').from('ui.pin');
  var removePins = window.import('removePins').from('ui.pin');
  var pinCard = window.import('*').from('ui.pinCard');
  var isElementShown = window.import('isElementShown').from('util.predicates');
  var loadData = window.import('load').from('net.backend');
  var createErrorMessage = window.import('createErrorMessage').from('net.errorMessage');
  var getFilteredAds = window.import('getFilteredAds').from('net.dataFilter');
  var debounce = window.import('debounce').from('util.debounce');

  var cardElement = domRef.mapElement.querySelector('.map__card');
  var inputElements = domRef.filterFormElement.querySelectorAll('.map__filter, .map__checkbox');

  var ads = [];

  var pinClickHandler = function (id) {
    var ad = ads[id];

    if (!cardElement.classList.contains('hidden')) {
      pinCard.updateCard(ad);
    }

    pinCard.showCard(ad);
  };

  var filterChangeHandler = function () {
    if (isElementShown(cardElement)) {
      pinCard.closeCard();
    }
    removePins();
    renderPins(getFilteredAds(ads));
  };

  var debouncedFilterChangeHandler = debounce(filterChangeHandler);

  var loadHandler = function (data) {
    ads = data.map(function (ad, idx) {
      ad.id = idx;
      return ad;
    });

    renderPins(ads.slice(0, PIN_MAX));

    inputElements.forEach(dom.unsetDisabled);
    dom.showElement(domRef.filterContainerElement);

    domRef.filterFormElement.addEventListener('change', debouncedFilterChangeHandler);
  };

  var errorHandler = function (errorMessage) {
    createErrorMessage(errorMessage, tryButtonHandler);
    deactivate();
  };

  var tryButtonHandler = function () {
    activate();
  };

  var activate = function () {
    loadData(loadHandler, errorHandler);
  };

  var deactivate = function () {
    ads = [];

    inputElements.forEach(dom.setDisabled);
    dom.hideElement(domRef.filterContainerElement);

    if (isElementShown(domRef.filterContainerElement)) {
      domRef.filterFormElement.removeEventListener('change', debouncedFilterChangeHandler);
    }
  };

  window.export({
    pinClickHandler: pinClickHandler,
    activate: activate,
    deactivate: deactivate,
  }).to('ui.filter');
})();
