'use strict';

(function (map, data, filter, ad) {
  var activate = function () {
    map.activate();
    data.loadPinsData();
    ad.activate();
  };

  var deactivate = function () {
    map.deactivate();
    filter.deactivate();
    ad.deactivate();
  };

  window.page = {
    activate: activate,
    deactivate: deactivate,
  };
})(window.map, window.data, window.filter, window.ad);
