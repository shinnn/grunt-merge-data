// grunt-merge-data
// Copyright (c) 2013 Shinnosuke Watanabe
// Licensed under the MIT license.

module.exports = function (grunt) {
  'use strict';
  
  var path = require('path');
  
  function mergeObjects (destObj, srcObj) {
    for (var attrname in srcObj) {
      if (srcObj.hasOwnProperty(attrname)) {
        destObj[attrname] = srcObj[attrname];
      }
    }
  }
  
  function mergeFileData (sources) {
    var data = {};
    sources.filter(function (filePath) {
      // Warn on and remove invalid source files (if nonull was set)
      if (!grunt.file.exists(filePath)) {
        grunt.log.warn('Source file "' + filePath + '" not found.');
        return false;
      } else {
        return true;
      }

    }).forEach(function (filePath) {
      var basename = path.basename(filePath, path.extname(filePath));
      var ext = path.extname(filePath).toLowerCase();
      
      if(ext === '.json') {
        data[basename] = grunt.file.readJSON(filePath);
      } else if (ext === '.yml' || ext === '.yaml') {
        data[basename] = grunt.file.readYAML(filePath);
      }
    });
    
    return data;
  }
  
  var mergeDataTask = function () {
    // Merge task-specific and/or target-specific options with these defaults
    var options = this.options({
      data: null,
      space: null,
      asConfig: false
    });
    
    // Iterate over all specified src/dest file groups
    this.files.forEach(function (file) {

      var data = mergeFileData(file.src);
      
      if (options.data) {
        if (typeof options.data === 'function') {
          mergeObjects(data, options.data(data));
        } else {
          mergeObjects(data, options.data);
        }
      }
      
      if (typeof options.asConfig === 'string') {
        grunt.config(options.asConfig, data);
        
      } else if (options.asConfig === true) {
        var nameArgs = grunt.task.current.nameArgs;

        grunt.config(
          nameArgs.replace(':', '.') + '.context',
          data
        );
      }

      // Write the destination file if 'dest' is specified
      if (file.dest) {
        grunt.file.write(
          file.dest,
          JSON.stringify(data, null, options.space)
        );
        // Print a success message
        grunt.log.writeln('File "' + file.dest + '" created.');

      } else if (!options.asConfig) {
        //grunt.log.warn("Both destination and "' + filePath + '" not found.');
      }
    });
  };

  grunt.registerMultiTask(
    'merge_data',
    'Merge multiple data into a file or Grint config.',
    mergeDataTask
  );
};
