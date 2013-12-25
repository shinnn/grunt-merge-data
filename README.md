# grunt-merge-data

[![NPM version](https://badge.fury.io/js/grunt-merge-data.png)](http://badge.fury.io/js/grunt-merge-data)
[![Build Status](https://travis-ci.org/shinnn/grunt-merge-data.png?branch=master)](https://travis-ci.org/shinnn/grunt-merge-data)
[![devDependency Status](https://david-dm.org/shinnn/grunt-merge-data/dev-status.png)](https://david-dm.org/shinnn/grunt-merge-data#info=devDependencies)

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-merge-data --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```javascript
grunt.loadNpmTasks('grunt-merge-data');
```

## The `merge_data` task

### Overview
In your project's Gruntfile, add a section named `merge_data` to the data object passed into `grunt.initConfig()`.

```javascript
grunt.initConfig({
  merge_data: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      src: ['path/to/src/*.{json,y{,a}ml}']
      dest: 'path/to/dest/all.json'
    }
  }
})
```

Running this task with `grunt merge_data` command will merge all data of specified JSON or YAML files into a single JavaScript object, and write it as a JSON file.

Each of the data will be formatted as `{<basename of file>: <data of file>}`.
For example, when the source path of task target specifies two files, such as:

data1.json:

```json
["Classic", "Jazz", "Rock"]
```
data2.yaml:

```yaml
first_name: John
family_name: Smith
```

they will be merged into a JSON file like this:

```json
{
  "data1": ["Classic", "Jazz", "Rock"],
  "data2": {
    "first_name": "John",
    "family_name": "Smith"
  }
}
```

### Options

#### options.data
Type: `Object`, `Function`
Default value: `null`

This is an additional data that will be merged together with the sources files.

This option will overrides existing data of source files.
For example, when `option.data` is `{data1: 'something'}`, the data of `data1.json` won't be reflected in the output.

#### options.space
Type: `Number`, `String`
Default value: `null`

This option will be directly passed to the [`space` argument](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#space_argument) of `JSON.stringify`. You can control indent style of output file with this option. 

#### options.asConfig
Type: `String`, `Array` `Boolean`
Default value: `false`

If you specified the project's Grunt configuration in this option, merge result will be assigned to that configuration. See [Accessing Config Data](http://gruntjs.com/api/grunt.config#accessing-config-data) to use this option.

Or, if you set this option `true`, the `context` property of the task traget will be overwritten instead.

For example, if the task is configured such as:

```javascript
grunt.initConfig({
  merge_data: {
    target1: {
      options: {
        asConfig: true
      },
      src: ['path/to/src/*.{json,y{,a}ml}']
    }
  }
})
``` 

the merge result will be assigned to `merge_data.target1.context` when you run `grunt merge_data:target1`.

When you use this option, you can also specify destination path of task target but don't need to.
If you do so, at the same time the configuration will be updated, the JSON file will be output. Both the configuration and the JSON file will have the same value.

### Usage Examples

#### Default Options

```javascript
grunt.initConfig({
  merge_data: {
    files: {
      'dest/all.json': ['src/data1.json', 'src/data2.json'],
    }
  }
})
```

#### Updating other configuration

```js
grunt.initConfig({
  merge_data: {
    options: {
      asConfig: 'someConfig.data' 
    },
    src: ['src/data1.json', 'src/data2.json']
  }
  
  someConfig: {}
})
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License

Copyright (c) 2013 [Shinnosuke Watanabe](https://github.com/shinnn).
Licensed under the MIT license.
