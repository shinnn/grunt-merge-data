# grunt-merge-data
# Copyright (c) 2013 - 2014 Shinnosuke Watanabe
# Licensed under the MIT license.

module.exports = (grunt) ->
  'use strict'

  require('time-grunt') grunt
  require('jit-grunt') grunt, {
    es6transpiler: 'grunt-es6-transpiler'
  }

  grunt.initConfig
    jsonlint:
      pkg: ['package.json']

    jshint:
      options:
        jshintrc: '.jshintrc'
        reporter: require 'jshint-stylish'
      all: ['src/merge_data.js', 'test/test.js']

    clean:
      all: ['tasks', 'test/actual/*', 'tmp']

    es6transpiler:
      options:
        environments: ['node', 'mocha']
      task:
        src: ['src/merge_data.js']
        dest: 'tasks/merge_data.js'
      test:
        src: ['test/test.js']
        dest: 'tmp/test-es5.js'

    espower:
      test:
        src: ['<%= es6transpiler.test.dest %>']
        dest: '<%= es6transpiler.test.dest %>'

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

      data_function_arg:
        options:
          asConfig: true
          data: (data) ->
            data.plan.next_time = data.plan.year + 1
            data
        src: ['test/fixtures/*']

      config_string:
        options:
          asConfig: 'testCfg'
        src: ['test/fixtures/*']

      config_string_nested:
        options:
          asConfig: 'nested.cfg'
        src: ['test/fixtures/*']

      config_array:
        options:
          asConfig: ['array', 'nested', 'cfg']
        src: ['test/fixtures/*']

    mochaTest:
      test:
        options:
          reporter: 'spec'
        src: ['<%= es6transpiler.test.dest %>']

    release:
      options: {}

  grunt.registerTask 'run_this_plugin', ->
    grunt.loadTasks 'tasks'
    grunt.task.run ['merge_data']

  grunt.registerTask 'build', [
    'clean'
    'jsonlint'
    'jshint'
    'es6transpiler'
  ]

  grunt.registerTask 'test', [
    'build'
    'run_this_plugin'
    'espower'
    'mochaTest'
  ]

  grunt.registerTask 'default', ['test']
