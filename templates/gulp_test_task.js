var gulp       = require('gulp');
var config     = require('../config');
var browserify = require('browserify');
var babelify   = require('babelify');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var onerror    = require('../utils/onerror');
var del        = require('del');
var qunit      = require('node-qunit-phantomjs');
var glob       = require('glob');
var sourcemaps = require('gulp-sourcemaps');
var path       = require('path');
var fs         = require('fs');
var sequence   = require('run-sequence');
var gutil      = require('gulp-util');

gulp.task('test-manifest', function(done) {
  glob(config.paths.testFiles, function(err, files) {
    if (err) { done(err); }

    var contents = 'require("' + path.resolve(config.paths.testHelper) + '");';

    contents += files.map(function(file) {
      return 'require("' + path.resolve(file) + '")';
    }).join(';');

    fs.writeFile(config.paths.testsLoader, contents, done);
  });
});

gulp.task('test-scripts', function(done) {
  browserify({
    entries: config.paths.testsLoader,
    paths: [config.paths.scriptsBaseDir, config.paths.testsBaseDir, config.paths.nodeModules],
    debug: true,
  })
    .transform(babelify.configure({
      sourceMapRelative: process.cwd(),
      optional: ['es7.asyncFunctions', 'runtime']
    }))
    .bundle().on('error', onerror)
    .pipe(source(config.paths.testsOutput))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.', {sourceMappingURLPrefix: config.paths.sourcemapsPrefix}))
    .pipe(gulp.dest(config.paths.testsOutputDir))
    .on('end', done);
});

gulp.task('test-run', function() {
  qunit(config.paths.testRunner, {}, function(exitcode) {
    if (config.production && exitcode !== 0) {
      process.exit(1);
    }
  });
});

gulp.task('test', function(done) {
  sequence(
    ['test-manifest', 'lint'],
    'test-scripts',
    'test-run',
    done
  );
});
