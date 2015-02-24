'use strict';

var assert = require('assert');
var path = require('path');

var clone = require('clone');
var grunt = require('grunt');

var member = [
  {
    name: 'Bob',
    skills: ['C', 'Java']
  },
  {
    name: 'Sue',
    skills: [
      'JavaScript',
      {altJS: ['Opal', 'Roy']}
    ]
  }
];

var plan = {
  title: 'Hackathon',
  year: 2014
};

var defaults = {member, plan};

describe('Task target', () => {
  describe('without any options', () => {
    it('should merge data of the source files simply.', () => {
      assert.deepEqual(
        grunt.file.readJSON('test/actual/no-options.json'),
        defaults
      );
    });

    it('should output a JSON file without spaces.', () => {
      assert.strictEqual(
        grunt.file.read('test/actual/no-options.json'),
        JSON.stringify(defaults)
      );
    });
  });

  describe('space: 1', () => {
    it('should output a spaced-style JSON file', () => {
      assert.strictEqual(
        grunt.file.read('test/actual/spaced-style.json'),
        JSON.stringify(defaults, null, 1)
      );
    });
  });

  describe('asConfig: true', () => {
    it('should set its own "context" option.', () => {
      assert.deepEqual(
        grunt.config('merge_data.as_config.context'),
        defaults
      );
    });

    describe('data: Object', () => {
      it('should set its own context with additional value.', () => {
        let actual = grunt.config('merge_data.data_object.context');
        let expected = clone(defaults);
        expected.attendance = true;
        assert.deepEqual(actual, expected);
      });
    });

    describe('data: Function', () => {
      it('should set its own context with the function\'s return.', () => {
        let actual = grunt.config('merge_data.data_function.context');
        let expected = clone(defaults);
        expected.place = 'TOKYO';
        assert.deepEqual(actual, expected);
      });

      describe('and using its "data" argument', () => {
        it('should set its own context with the function\'s return.', () => {
          let actual = grunt.config('merge_data.data_function_arg.context');
          let expected = clone(defaults);
          expected.plan.next_time = 2015; // jshint ignore:line
          assert.deepEqual(actual, expected);
        });
      });
    });
  });

  describe('asConfig: "testCfg"', () => {
    it('should configure "testCfg".', () => {
      assert.deepEqual(grunt.config('testCfg'), defaults);
    });
  });

  describe('asConfig: "nested.cfg"', () => {
    it('should configure "nested.cfg".', () => {
      assert.deepEqual(grunt.config('nested.cfg'), defaults);
    });
  });

  describe('asConfig: ["array", "nested", "cfg"]', () => {
    it('should configure "array.nested.cfg".', () => {
      assert.deepEqual(grunt.config('array.nested.cfg'), defaults);
    });
  });
});
