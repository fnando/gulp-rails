var gulp         = require('gulp');
var config       = require('../config');
var handlebars   = require('gulp-handlebars');
var defineModule = require('gulp-define-module');

gulp.task('templates', function() {
  gulp
    .src(config.paths.templates)
    .pipe(handlebars())
    .pipe(defineModule('commonjs'))
    .pipe(gulp.dest(config.paths.templatesOutput));
});
