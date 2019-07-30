'use strict';

(function () {
  var offerTypeToMinPrice = window.import('offerTypeToMinPrice').from('types');
  var MainPinSize = window.import('MainPinSize').from('types');
  var dom = window.import('unsetDisabled', 'setDisabled').from('util.dom');
  var getMainPinPosition = window.import('getMainPinPosition').from('ui.mainPin');

  var formElement = document.querySelector('.ad-form');
  var fieldSets = formElement.querySelectorAll('fieldset');
  var addressInput = formElement.querySelector('#address');
  var typeSelect = formElement.querySelector('#type');
  var priceInput = formElement.querySelector('#price');
  var timeInSelect = formElement.querySelector('#timein');
  var timeOutSelect = formElement.querySelector('#timeout');

  var priceInputChangeHandler = function (evt) {
    var minPrice = offerTypeToMinPrice[evt.target.value];
    priceInput.min = minPrice;
    priceInput.placeholder = minPrice;
  };

  var timeInSelectChangeHandler = function () {
    timeInSelect.value = timeOutSelect.value;
  };

  var timeOutSelectChangeHandler = function () {
    timeOutSelect.value = timeInSelect.value;
  };

  var renderAddress = function (location) {
    addressInput.value = location.x + ', ' + location.y;
  };

  var activate = function () {
    formElement.classList.remove('ad-form--disabled');
    fieldSets.forEach(dom.unsetDisabled);

    renderAddress(getMainPinPosition(MainPinSize.HEIGHT));
  };

  var deactivate = function () {
    formElement.classList.add('ad-form--disabled');
    fieldSets.forEach(dom.setDisabled);

    renderAddress(getMainPinPosition(MainPinSize.RADIUS));
  };

  typeSelect.addEventListener('change', priceInputChangeHandler);
  timeInSelect.addEventListener('change', timeOutSelectChangeHandler);
  timeOutSelect.addEventListener('change', timeInSelectChangeHandler);

  window.export({
    renderAddress: renderAddress,
    activate: activate,
    deactivate: deactivate,
  }).to('ui.ad');
})();
