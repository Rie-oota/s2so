const gulp = require('gulp');
const webserver = require('gulp-webserver');
gulp.task('server', function() {
  return gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
      port: 8000,
      host: '0.0.0.0',  // これを追加（外部アクセス許可）
      fallback: 'index.html',
      directoryListing: false
    }));
});
gulp.task('default', gulp.series('server'));