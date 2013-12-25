# grunt-merge-data
# Copyright (c) 2013 Shinnosuke Watanabe
# Licensed under the MIT license.

module.exports = (grunt) ->
  'use strict'
  
  require('load-grunt-tasks') grunt
    
  grunt.initConfig
    jshint:
      options:
        camelcase: true
        trailing: true
        indent: 2
        node: true
        reporter: require 'jshint-stylish'
      all: ['tasks/*.js']

    clean:
      tests: ['test/actual/*']
    
    merge_data:
      no_options:
        src: ['test/fixtures/*']
        dest: 'test/actual/no-options.json'

      spaced:
        options:
          space: 1
        src: ['test/fixtures/*']
        dest: 'test/actual/spaced-style.json'

      as_config:
        options:
          asConfig: true
        src: ['test/fixtures/*']

      data_object:
        options:
          asConfig: true
          data:
            attendance: true
        src: ['test/fixtures/*']

      data_function:
        options:
          asConfig: true
          data: ->
            data = {}
            data.place = 'tokyo'.toUpperCase()
            data
        src: ['test/fixtures/*']

      external_config:
        options:
          asConfig: 'testCfg'
        src: ['test/fixtures/*']
    
    testCfg: {}
    
    mochaTest:
      test:
        options:
          reporter: 'spec'
        src: ['test/*.coffee']

    release:
      options: {}
    
  # Actually load this plugin's task
  grunt.loadTasks 'tasks'
  
  # Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask 'test', [
    'clean'
    'jshint'
    'merge_data'
    'mochaTest'
  ]
  
  grunt.registerTask 'default', ['test']