var Promise = require("bluebird");

exports = module.exports = function (app) {

  app = app || {};

  var _phases = [];

  app.phase = function(name, fn, args) {
    if (name instanceof Function) {
      args = [].slice.call(arguments, 1);
      fn = name;
      name = 'Phase ' + (_phases.length + 1);
    } else {
      args = [].slice.call(arguments, 2);
    }

    _phases.push([name, fn, args]);
    return this;
  }

  app.boot = function() {
    var results = [];
    return _phases.reduce(function(promise, phase) {
      var name = phase[0];
      var fn = phase[1];
      var args= phase[2];

      return promise.then(function() {
        return Promise.method(fn).apply(null, args).then(function(service) {
          results.push([service, name])
        }, function(error) {
          error.message = 'Boot failed during [' + name + ']: ' + error.message;
          return Promise.reject(error);
        });
      })
    }, Promise.resolve()).then(function() {
      return results;
    })
  }

  return app;

}
