var gulp = require('gulp');
var config = require('../config');
var jshint = require('gulp-jshint');
var gutil  = require('gulp-util');

gulp.task('lint', function() {
  gulp.src(config.paths.scriptsMainFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(config.production ? jshint.reporter('fail') : gutil.noop());
});
