/*
 * grunt-merge-data
 * Copyright (c) 2013 Shinnosuke Watanabe
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
  'use strict';
  
  var path = require('path');
  
  var mergeObjects = function (obj1, obj2) {
    for (var attrname in obj2) {
      if (obj2.hasOwnProperty(attrname)) {
        obj1[attrname] = obj2[attrname];
      }
    }
  };
  
  var mergeData = function () {
    // Merge task-specific and/or target-specific options with these defaults
    var options = this.options({
      data: null,
      space: null,
      asConfig: false
    });
    
    // Iterate over all specified file groups
    this.files.forEach(function (file) {
      var data = {};

      file.src.filter(function (filePath) {
        // Warn on and remove invalid source files (if nonull was set)
        if (!grunt.file.exists(filePath)) {
          grunt.log.warn('Source file "' + filePath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function (filePath) {
        var basename = path.basename(filePath, path.extname(filePath));
        var ext = path.extname(filePath).toLowerCase();
        if(ext === '.json') {
          data[basename] = grunt.file.readJSON(filePath);
        } else if (ext === '.yml' || ext === '.yaml') {
          data[basename] = grunt.file.readYAML(filePath);
        }
      });
      
      if (options.data) {
        if (typeof options.data === 'function') {
          mergeObjects(data, options.data());
        } else {
          mergeObjects(data, options.data);
        }
      }
      
      if (typeof options.asConfig === 'string') {
        grunt.config.set(options.asConfig, data);
        
      } else if (options.asConfig === true) {
        var taskName = grunt.task.current.name;
        var nameArg = grunt.task.current.nameArgs.split(':')[1];

        var newTaskSetting = grunt.config.get(taskName);
        newTaskSetting[nameArg].context = data;
        grunt.config.set(taskName, newTaskSetting);
      }

      // Write the destination file if 'dest' is specified
      if (file.dest) {
        grunt.file.write(
          file.dest,
          JSON.stringify(data, null, options.space)
        );

        // Print a success message
        grunt.log.writeln('File "' + file.dest + '" created.');
      }
    });
  };

  grunt.registerMultiTask(
    'merge_data',
    'Merge multiple data into a file or Grint config.',
    mergeData
  );
};
