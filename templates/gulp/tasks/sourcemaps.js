// Move source maps somewhere else. This is done only for production build.
var gulp   = require('gulp');
var config = require('../config');
var glob   = require('glob');
var fs     = require('fs');
var path   = require('path');

gulp.task('sourcemaps', function(done) {
  fs.mkdirSync(config.paths.sourcemapsOutput, '0755');

  glob(config.paths.sourcemaps, function(err, files) {
    if (err) { done(err); }

    files.forEach(function(file) {
      fs.renameSync(file, path.join(config.paths.sourcemapsOutput, path.basename(file)));
    })

    done();
  });
});
