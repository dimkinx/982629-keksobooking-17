'use strict';

(function (utils, map, filter, ad) {
  var activate = function () {
    map.activate();
    filter.activate();
    ad.activate();
  };

  var activatePageOnce = utils.once(function () {
    activate();
  });

  var deactivate = function () {
    map.deactivate();
    filter.deactivate();
    ad.deactivate();
  };

  window.page = {
    activate: activate,
    activateOnce: activatePageOnce,
    deactivate: deactivate,
  };
})(window.utils, window.map, window.filter, window.ad);
