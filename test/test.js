'use strict';

var path = require('path');
var assert = require('power-assert');
var grunt = require('grunt');
var clone = require('clone');

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

var defaults = {member, plan}; // jshint ignore:line

describe('Task target', () => {
  describe('with no options', () => {
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
  describe('with "space" option set to 1', () => {
    it('should output a spaced-style JSON file', () => {
      assert.strictEqual(
        grunt.file.read('test/actual/spaced-style.json'),
        JSON.stringify(defaults, null, 1)
      );
    });
  });
  describe('with "asConfig" option set to true', () => {
    it('should set its own "context" option.', () => {
      assert.deepEqual(
        grunt.config('merge_data.as_config.context'),
        defaults
      );
    });
    describe('with "data" option set to an object', () => {
      it('should set its own context with additional value.', () => {
        let actual = grunt.config('merge_data.data_object.context');
        let expected = clone(defaults);
        expected.attendance = true;
        assert.deepEqual(actual, expected);
      });
    });
    describe('with "data" option set to a function', () => {
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
  describe('with "asConfig" option set to "testCfg"', () => {
    it('should configure "testCfg".', () => {
      assert.deepEqual(grunt.config('testCfg'), defaults);
    });
  });
  describe('with "asConfig" option set to ["array", "cfg"]', () => {
    it('should configure "array.cfg".', () => {
      assert.deepEqual(grunt.config('array.cfg'), defaults);
    });
  });
});
