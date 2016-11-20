var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('server', function () {
  return gulp.src(['index.js', 'components/**/*.jsx'], { base: '.' })
       .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('watch', function () {
  gulp.watch(['index.js', 'index.nunjucks'], ['server']);
});
