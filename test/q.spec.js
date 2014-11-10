describe('bootleg', function() {
  var Q       = require('q');

  it('should support phases that return promises that were not created by bluebird', function() {
    var app = bootleg();
    var expectedService = {foo: "bar"};

    app.phase('test', function() {
      return Q(expectedService)
    })

    var resolvedPromise = app.boot().then(function(results) {
      expect(results.test).to.eql(expectedService)
    })

    var app = bootleg();
    app.phase('test', function() {
      return Q.reject(new Error('bla'));
    })

    var rejectedPromise = expect(app.boot()).to.be.rejected;

    return Q.all(rejectedPromise, resolvedPromise);
  })
})



