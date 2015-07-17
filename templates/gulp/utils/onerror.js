var gutil = require('gulp-util');

module.exports = function onerror(error) {
  gutil.log(gutil.colors.red('\nERROR:', error.message));
  this.emit('end');
};
