'use strict';

var grunt = require('grunt');

exports.mergeData = {
  setUp: function (done) {
    // setup here if necessary
    done();
  },
  defaultOptions: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/actual/default_options.json');
    var expected = grunt.file.read('test/expected/default_options.json');
    test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  customOptions: function (test) {
    test.expect(1);

    var actual = grunt.file.read('test/actual/custom_options.json');
    var expected = grunt.file.read('test/expected/custom_options.json');
    test.equal(actual, expected, 'should describe what the custom option(s) behavior is.');

    test.done();
  }
};
