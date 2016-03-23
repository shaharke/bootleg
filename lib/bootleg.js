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
    var services = { all: []}

    return _phases.reduce(function(promise, phase, index) {
      var name = phase[0];
      var fn = phase[1];
      var args = phase[2];

      return promise.then(function() {

        try {
          args = args.map(function(arg) {
            if (typeof arg == 'string' && arg.indexOf('@') == 0) {
              var serviceName = arg.slice(1)
              var service = services[serviceName];
              if (!service) {
                throw new Error("Service " + serviceName + " cannot be injected during " + name)
              }
              return service;
            }
            return arg;
          })
        } catch (e) {
          return Promise.reject(e);
        }

        return Promise.method(fn).apply(null, args).then(function(service) {
          services[name] = service;
          services.all.push(service)
          services[index] = service;
        }, function(error) {
          error.message = 'Boot failed during [' + name + ']: ' + error.message;
          return Promise.reject(error);
        });
      })
    }, Promise.resolve()).then(function() {
      return services;
    })
  }

  return app;

}
