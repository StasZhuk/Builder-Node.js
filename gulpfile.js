'use strict';
const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

global.$ = {
  dev: isDevelopment,
  package: require('./package.json'),
  config: require('./gulp/config'),
  path: {
    task: require('./gulp/paths/tasks.js'),
    jsFoundation: require('./gulp/paths/js.foundation.js'),
    cssFoundation: require('./gulp/paths/css.foundation.js'),
    app: require('./gulp/paths/app.js')
  },
  gulp: require('gulp'),
  rimraf: require('del'),
  merge: require('merge-stream'),
  browserify : require('browserify'),
  source : require('vinyl-source-stream'),
  buffer : require('vinyl-buffer'),
  babel : require('babelify'),
  browserSync: require('browser-sync').create(),
  fs : require('fs'),
  gp: require('gulp-load-plugins')({
    rename: {
      'gulp-replace-task': 'replaceTask'
    }
  })
};

$.path.task.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('default', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'copy:root',
    'js:foundation',
    'js:process',
    'copy:image',
    'copy:font',
    'css:foundation',
    'create:version'
  ),
    $.gulp.parallel(
    'nodemon'
  ),
  $.gulp.parallel(
    'watch',
    'serve'
  )
));


$.gulp.task('build', $.gulp.series(
  'clean',
  $.gulp.parallel(
    'sass',
    'copy:root',
    'js:foundation',
    'js:process',
    'copy:image',
    'copy:font',
    'css:foundation',
    'create:version'
  )
));
