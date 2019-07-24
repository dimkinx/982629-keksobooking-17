'use strict';

(function () {
  var offerTypeToMinPrice = window.import('offerTypeToMinPrice').from('types');
  var MainPinSize = window.import('MainPinSize').from('types');
  var dom = window.import('unsetDisabled', 'setDisabled').from('util.dom');
  var getMainPinPosition = window.import('getMainPinPosition').from('ui.pin');

  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('fieldset');
  var addressInput = form.querySelector('#address');
  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');

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
    form.classList.remove('ad-form--disabled');
    fields.forEach(dom.unsetDisabled);

    renderAddress(getMainPinPosition(MainPinSize.HEIGHT));
  };

  var deactivate = function () {
    form.classList.add('ad-form--disabled');
    fields.forEach(dom.setDisabled);

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
