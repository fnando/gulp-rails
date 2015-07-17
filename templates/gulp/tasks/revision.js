var gulp    = require('gulp');
var config  = require('../config');
var rev     = require('gulp-rev');
var replace = require('gulp-rev-replace');
var path    = require('path');

gulp.task('revision', ['revision-generate'], function(){
  var manifest = gulp.src(config.paths.revisionManifest);

  return gulp.src(config.paths.revisionReplace)
    .pipe(replace({manifest: manifest}))
    .pipe(gulp.dest(config.paths.public));
});

gulp.task('revision-generate', function(done) {
  gulp.src([config.paths.revision])
    .pipe(rev())
    .pipe(gulp.dest(config.paths.public))
    .pipe(rev.manifest())
    .pipe(gulp.dest(config.paths.public))
    .on('end', done);
});
