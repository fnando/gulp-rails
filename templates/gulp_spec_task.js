var gulp       = require('gulp');
var config     = require('../config');
var browserify = require('browserify');
var babelify   = require('babelify');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');
var onerror    = require('../utils/onerror');
var del        = require('del');
var jasmine    = require('gulp-jasmine-phantom');
var glob       = require('glob');
var sourcemaps = require('gulp-sourcemaps');
var path       = require('path');
var fs         = require('fs');
var sequence   = require('run-sequence');
var gutil      = require('gulp-util');

gulp.task('spec-manifest', function(done) {
  glob(config.paths.specFiles, function(err, files) {
    if (err) { done(err); }

    var contents = 'require("' + path.resolve(config.paths.specHelper) + '");';

    contents += files.map(function(file) {
      return 'require("' + path.resolve(file) + '")';
    }).join(';');

    fs.writeFile(config.paths.specLoader, contents, done);
  });
});

gulp.task('spec-scripts', function(done) {
  browserify({
    entries: config.paths.specLoader,
    paths: [config.paths.scriptsBaseDir, config.paths.specBaseDir, config.paths.nodeModules],
    debug: true,
  })
    .transform(babelify.configure({
      sourceMapRelative: process.cwd(),
      optional: ['es7.asyncFunctions', 'runtime']
    }))
    .bundle().on('error', onerror)
    .pipe(source(config.paths.specsOutput))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sourcemaps.write('.', {sourceMappingURLPrefix: config.paths.sourcemapsPrefix}))
    .pipe(gulp.dest(config.paths.specsOutputDir))
    .on('end', done);
});

gulp.task('spec-run', function() {
  gulp.src('tmp/specs.js')
    .pipe(jasmine({
      integration: true,
      specHtml: config.paths.specRunner,
      abortOnFail: config.production
    }));
});

gulp.task('spec', function(done) {
  sequence(
    ['spec-manifest', 'lint'],
    'spec-scripts',
    'spec-run',
    done
  );
});
