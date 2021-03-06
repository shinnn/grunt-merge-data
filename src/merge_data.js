// grunt-merge-data
// Copyright (c) 2013 - 2015 Shinnosuke Watanabe
// Licensed under the MIT license

'use strict';

var path = require('path');

var chalk = require('chalk');
var objectAssign = require('object-assign');

module.exports = grunt => {
  function mergeFileData(sources) {
    var data = {};
    sources.filter(filePath => {
      // Warn on and remove invalid source files (if nonull was set)
      if (!grunt.file.exists(filePath)) {
        grunt.log.warn(`Source file ${filePath} not found.`);
        return false;
      } else {
        return true;
      }
    }).forEach(filePath => {
      var basename = path.basename(filePath, path.extname(filePath));
      var ext = path.extname(filePath).toLowerCase();

      if (ext === '.json') {
        data[basename] = grunt.file.readJSON(filePath);
      } else if (ext === '.yml' || ext === '.yaml') {
        data[basename] = grunt.file.readYAML(filePath);
      } else {
        try {
          data[basename] = grunt.file.readJSON(filePath);
        } catch (e) {
          data[basename] = grunt.file.readYAML(filePath);
        }
      }
    });

    return data;
  }

  grunt.registerMultiTask(
    'merge_data',
    'Merge multiple data into a file or Grunt config.',
    function mergeDataTask() {
      var options = this.options({
        data: null,
        space: null,
        asConfig: false
      });

      this.files.forEach(file => {
        var data  = mergeFileData(file.src);

        if (options.data) {
          if (typeof options.data === 'function') {
            objectAssign(data, options.data(data));
          } else {
            objectAssign(data, options.data);
          }
        }

        var targetConfig;
        if (typeof options.asConfig === 'string') {
          targetConfig = options.asConfig;

        // Accept an array of property name parts
        } else if (Array.isArray(options.asConfig)) {
          targetConfig = options.asConfig.join('.');

        } else if (options.asConfig === true) {
          targetConfig = grunt.task.current.nameArgs
          .replace(':', '.') + '.context';
        }

        if (targetConfig) {
          grunt.config(targetConfig, data);
          grunt.log.writeln(`Config ${chalk.green(targetConfig)} updated.`);
        }

        // Write the destination file if 'dest' is specified
        if (file.dest) {
          grunt.file.write(
            file.dest,
            JSON.stringify(data, null, options.space)
          );
          // Print a success message
          grunt.log.writeln(`File ${chalk.cyan(file.dest)} created.`);

        } else if (!targetConfig) {
          // when the task does nothing
          grunt.log.warn('Neither destination path or config specified.');
        }
      });
    }
  );
};
