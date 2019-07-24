'use strict';

(function () {
  var reduce = Array.prototype.reduce;
  var scopes = {};

  var getScope = function (name) {
    return scopes[name] || {};
  };

  var makeDepReducer = function (source) {
    return function (deps, name) {
      deps[name] = source[name];
      return deps;
    };
  };

  var makeDepImport = function (importer) {
    return function (target) {
      return function (scope) {
        return importer(target, getScope(scope));
      };
    };
  };

  var getDep = function (dep, scope) {
    return dep === '*' ? Object.assign({}, scope) : scope[dep];
  };

  var getDeps = function (deps, scope) {
    return reduce.call(deps, makeDepReducer(scope), {});
  };

  var getSingleImport = makeDepImport(getDep);
  var getMultiImport = makeDepImport(getDeps);

  var getImporter = function (deps) {
    return deps.length === 1 ? getSingleImport(deps[0]) : getMultiImport(deps);
  };

  window.import = function () {
    return {
      from: getImporter(arguments),
    };
  };

  window.export = function (deps) {
    return {
      to: function (scope) {
        scopes[scope] = Object.keys(deps)
          .reduce(makeDepReducer(deps), getScope(scope));
      },
    };
  };
})();
