'use strict';

var grunt = require('grunt');

var path = require('path');
var files = grunt.file.expandMapping (
  '{,*/}*.json',
  'test/expected',
  { cwd: 'test/actual' }
);

function exportTests (map) {
  var basename = path.basename(map.src);
  
  exports[basename] = function (test) {
    var actual = grunt.file.read(map.src);
    var expected = grunt.file.read(map.dest);
    
    test.strictEqual(
      actual,
      expected,
      basename + " is not equal to expected output."
    );
    test.done();
  };
}

files.forEach(exportTests);
