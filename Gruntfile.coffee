# grunt-merge-data
# Copyright (c) 2013 Shinnosuke Watanabe
# Licensed under the MIT license.


module.exports = (grunt) ->
  'use strict'
  
  require('load-grunt-tasks') grunt
  
  grunt.initConfig
    jshint:
      all: [
        'tasks/*.js'
        '<%= nodeunit.tests %>'
      ]
      options:
        camelcase: true
        trailing: true
        indent: 2
        node: true
        reporter: require 'jshint-stylish'

    clean:
      tests: ['test/actual']
    
    merge_data:
      no_options:
        options: {}
        src: [
          'test/fixtures/member.yaml'
          'test/fixtures/plan.json'
        ]
        dest: 'test/actual/default_options.json'

      custom:
        options:
          data:
            attendance: true
          space: 1
          asConfig: true
        src: [
          'test/fixtures/member.yaml'
          'test/fixtures/plan.json'
        ]
        dest: 'test/actual/custom_options.json'

      as_config:
        options:
          asConfig: 'ctx'
        src: [
          'test/fixtures/member.yaml'
          'test/fixtures/plan.json'
        ]

    # Unit tests
    nodeunit:
      tests: ['test/*_test.js']
      
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
    console.log grunt.config('ctx.plan')
  
  grunt.registerTask 'default', [
    'jshint'
    'test'
  ]