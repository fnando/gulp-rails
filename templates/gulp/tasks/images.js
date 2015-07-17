var gulp   = require('gulp');
var config = require('../config');
var del    = require('del');

gulp.task('images-clean', function(done) {
  del(config.paths.imagesOutput, done);
});

gulp.task('images', ['images-clean'], function() {
  gulp
    .src(config.paths.images)
    .pipe(gulp.dest(config.paths.imagesOutput))
});
