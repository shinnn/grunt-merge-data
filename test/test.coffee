'use strict'

path = require 'path'
assert = require 'assert'

grunt = require 'grunt'
clone = require 'clone'

defaults =
  member: [
    {
      name: 'Bob',
      skills: ['C', 'Java']
    }
    {
      name: 'Sue'
      skills: [
        'JavaScript'
        altJS: ['Opal', 'Roy']  
      ]
    }
  ]
  plan:
    title: 'Hackathon'
    year: 2014

describe 'Task target', ->
  describe 'with no options', ->
    it 'should merge data of the source files simply.', ->
      actual = grunt.file.readJSON 'test/actual/no-options.json'
      assert.deepEqual actual, defaults
    
    it 'should output a JSON file without spaces.', ->
      actual = grunt.file.read 'test/actual/no-options.json'
      expected = JSON.stringify defaults

      assert.strictEqual actual, expected

  describe "with 'space' option set to 1", ->
    it 'should output a spaced-style JSON file', ->
      actual = grunt.file.read 'test/actual/spaced-style.json'
      expected = JSON.stringify defaults, null, 1

      assert.strictEqual actual, expected

  describe "with 'asConfig' option set to true", ->
    it "should set its own 'context' option.", ->
      actual = grunt.config 'merge_data.as_config.context'

      assert.deepEqual actual, defaults

    describe "with 'data' option set to an object", ->
      it "should set its own context with additional value.", ->
        actual = grunt.config 'merge_data.data_object.context'
        expected = clone defaults
        expected.attendance = true

        assert.deepEqual actual, expected

    describe "with 'data' option set to a function", ->
      it "should set its own context with the function's return.", ->
        actual = grunt.config 'merge_data.data_function.context'
        expected = clone defaults
        expected.place = 'TOKYO'

        assert.deepEqual actual, expected
        
      describe "and using its 'data' argument", ->
        it "should set its own context with the function's return.", ->
          actual = grunt.config 'merge_data.data_function_arg.context'
          expected = clone defaults
          expected.plan.next_time = 2015

          assert.deepEqual actual, expected

  describe "with 'asConfig' option set to 'testCfg'", ->
    it "should configure 'testCfg'.", ->
      actual = grunt.config 'testCfg'

      assert.deepEqual actual, defaults

  describe "with 'asConfig' option set to ['array', 'cfg']", ->
    it "should configure 'array.cfg'.", ->
      actual = grunt.config 'array.cfg'

      assert.deepEqual actual, defaults
