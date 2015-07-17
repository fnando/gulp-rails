// Compile JavaScript files.
// All .js files living at app/frontend/scripts/*.js will be exported
// as a separated bundle file. This way you can have different script
// files for different sections, like the marketing website and the application.

var gulp       = require('gulp');
var config     = require('../config');
var buffer     = require('vinyl-buffer');
var browserify = require('browserify');
var del        = require('del');
var uglify     = require('gulp-uglify');
var source     = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var babelify   = require('babelify');
var onerror    = require('../utils/onerror');
var gutil      = require('gulp-util');
var es         = require('event-stream');
var glob       = require('glob');
var normalize  = /app\/frontend\/scripts\//;
var path       = require('path');

function bundle(entry) {
  return browserify({
    entries: entry,
    paths: [config.paths.scriptsBaseDir, config.paths.nodeModules],
    debug: true
  })
    .transform(babelify.configure({
      sourceMapRelative: process.cwd(),
      optional: ['es7.asyncFunctions', 'runtime']
    }))
    .bundle().on('error', onerror)
    .pipe(source(path.basename(entry)))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(config.production ? uglify() : gutil.noop()).on('error', onerror)
    .pipe(sourcemaps.write('.', {sourceMappingURLPrefix: config.paths.sourcemapsPrefix}))
    .pipe(gulp.dest(config.paths.scriptOutput));
}

gulp.task('scripts-clean', function(done) {
  del(config.paths.scriptsClean, done);
});

gulp.task('scripts', ['scripts-clean'], function(done) {
  glob(config.paths.scriptsMainFiles, function(err, files) {
    if (err) { done(err); }

    var tasks = files.map(function(file) {
      return bundle(file);
    });

    es.merge(tasks).on('end', done);
  });
});
