describe('', function() {

  var Promise = require('bluebird');

  describe('#phase', function() {

    it('should support receiving anonymous function', function() {
      var expectedService = {foo: 'bar'}
      var app = bootleg();

      app.phase(function() {
        return expectedService;
      })

      return app.boot().then(function(services) {
        expect(services[0]).to.eql(expectedService);
      })

    })

    it('should support receiving named function', function() {
      var expectedService = {foo: 'bar'}
      var app = bootleg();

      app.phase('test', function() {
        return expectedService;
      })

      return app.boot().then(function(services) {
        expect(services[0]).to.eql(expectedService);
        expect(services['test']).to.eql(expectedService);
      })

    })

    it('should support receiving named function with single arg', function() {
      var expectedService = 'bar'
      var app = bootleg();

      app.phase('test', function(value) {
        return value;
      }, 'bar')

      return app.boot().then(function(services) {
        expect(services[0]).to.eql(expectedService);
        expect(services['test']).to.eql(expectedService);
      })
    })

    it('should support receiving named function with multiple args', function() {
      var expectedService = 10
      var app = bootleg();

      app.phase('test', function(a, b) {
        return a * b;
      }, 5, 2)

      return app.boot().then(function(services) {
        expect(services[0]).to.eql(expectedService);
        expect(services['test']).to.eql(expectedService);
      })
    })

    it('should support receiving anonymous function with multiple args', function() {
      var expectedService = 10
      var app = bootleg();

      app.phase(function(a, b) {
        return a * b;
      }, 5, 2)

      return app.boot().then(function(services) {
        expect(services[0]).to.eql(expectedService);
      })
    })
  })

  describe('#boot', function() {

    it('should fail in case one of the phases returns a rejected promise', function() {

      var app = bootleg();

      app.phase(function() {
        return Promise.reject(new Error());
      })

      expect(app.boot()).to.be.rejected
    })

    it('should fail in case one of the phases throws an error', function() {
      var app = bootleg();

      app.phase(function() {
        throw new Error();
      })

      expect(app.boot()).to.be.rejected
    })

  })
})