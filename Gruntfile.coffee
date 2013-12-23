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
      all: [
        'tasks/*.js'
        '<%= nodeunit.tests %>'
      ]

    clean:
      tests: ['test/actual/*']
    
    merge_data:
      no_options:
        options: {}
        src: ['test/fixtures/*']
        dest: 'test/actual/no-options.json'

      data_object:
        options:
          data:
            attendance: true
        src: ['test/fixtures/*']
        dest: 'test/actual/data-object.json'

      data_function:
        options:
          data: ->
            word = 'Apple'
            {word: word.toLowerCase()}
        src: ['test/fixtures/*']
        dest: 'test/actual/data-function.json'

      spaced:
        options:
          space: 1
        src: ['test/fixtures/*']
        dest: 'test/actual/spaced-style.json'

      as_config:
        options:
          asConfig: true
        src: ['test/fixtures/*']

    nodeunit:
      tests: ['test/test.js']
    
    release:
      options: {}
    
    ctx: {}
  
  # Actually load this plugin's task
  grunt.loadTasks 'tasks'
  
  # Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  # plugin's task(s), then test the result.
  grunt.registerTask 'test', [
    'clean'
    'merge_data'
    'nodeunit'
  ]
  
  grunt.registerTask 'context', ->
    console.log grunt.config('merge_data.as_config.context')
  
  grunt.registerTask 'default', [
    'jshint'
    'test'
  ]