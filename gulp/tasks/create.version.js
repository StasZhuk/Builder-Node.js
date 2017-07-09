'use strict';
var jsonfile = require('jsonfile');
var file = 'version.json';
var obj = {
  version: $.dev ? '' : `?rel=${Math.ceil(Math.random()*1000000)}`,
  suffix: $.dev ? '' : '.min'
};

module.exports = function () {
  $
    .gulp
    .task('create:version', function (cb) {
      jsonfile
        .writeFile(file, obj, function (err) {
          cb();
        });
    });
};