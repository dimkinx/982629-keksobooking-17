'use strict';

(function (map, data, ad) {
  var activate = function () {
    map.activate();
    data.loadPinsData();
    ad.activate();
  };

  var deactivate = function () {
    map.deactivate();
    ad.deactivate();
  };

  window.page = {
    activate: activate,
    deactivate: deactivate,
  };
})(window.map, window.data, window.ad);
