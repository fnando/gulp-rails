var gulp         = require('gulp');
var config       = require('../config');
var globbing     = require('gulp-css-globbing');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps   = require('gulp-sourcemaps');
var del          = require('del');

gulp.task('styles-clean', function(done) {
  del(config.paths.stylesClean, done);
});

gulp.task('styles', ['styles-clean'], function() {
  gulp
    .src(config.paths.styles)
    .pipe(sourcemaps.init())
    .pipe(globbing({extensions: ['.scss']}))
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.paths.stylesOutput))
});
