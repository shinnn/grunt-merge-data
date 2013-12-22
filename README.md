# grunt-merge-data

[![NPM version](https://badge.fury.io/js/grunt-merge-data.png)](http://badge.fury.io/js/grunt-merge-data)
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
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.data
Type: `Object`, `Function`
Default value: `null`

A string value that is used to do something with whatever.

#### options.space
Type: `Number`, `String`
Default value: `null`

A string value that is used to do something else with whatever else.

#### options.asConfig
Type: `String`, `Boolean`
Default value: `false`

A string value that is used to do something else with whatever else.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```javascript
grunt.initConfig({
  merge_data: {
    options: {},
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

#### Custom Options
In this example, custom options are used to do something else with whatever else. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result in this case would be `Testing: 1 2 3 !!!`

```js
grunt.initConfig({
  merge_data: {
    options: {
      separator: ': ',
      punctuation: ' !!!',
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## License
Copyright (c) 2013 Shinnosuke Watanabe. Licensed under the MIT license.
