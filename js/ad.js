'use strict';

(function (types, utils) {
  var form = document.querySelector('.ad-form');
  var fields = form.querySelectorAll('fieldset');
  var addressInput = form.querySelector('#address');
  var typeSelect = form.querySelector('#type');
  var priceInput = form.querySelector('#price');
  var timeInSelect = form.querySelector('#timein');
  var timeOutSelect = form.querySelector('#timeout');

  var priceInputChangeHandler = function (evt) {
    var minPrice = types.offerTypeToMinPrice[evt.target.value];
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
    fields.forEach(utils.unsetDisabled);

    renderAddress(window.pin.getMainPinPosition(types.MainPinSize.HEIGHT));
  };

  var deactivate = function () {
    form.classList.add('ad-form--disabled');
    fields.forEach(utils.setDisabled);

    renderAddress(window.pin.getMainPinPosition(types.MainPinSize.RADIUS));
  };

  typeSelect.addEventListener('change', priceInputChangeHandler);
  timeInSelect.addEventListener('change', timeOutSelectChangeHandler);
  timeOutSelect.addEventListener('change', timeInSelectChangeHandler);

  window.ad = {
    renderAddress: renderAddress,
    activate: activate,
    deactivate: deactivate,
  };
})(window.types, window.utils);
