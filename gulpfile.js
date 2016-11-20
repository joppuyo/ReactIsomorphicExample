var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');

gulp.task('server', function() {
  return gulp.src(['index.js', 'components/**/*.jsx'], { base: '.' })
       .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('browser', function() {
  return gulp.src('browser.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'build/index.js',
    watch: 'build',
  });
});

gulp.task('watch', function() {
  gulp.watch(['index.js', 'components/**/*.jsx', 'index.nunjucks'], ['server']);
  gulp.watch(['browser.jsx', 'components/**/*.jsx'], ['browser']);
});

gulp.task('default', ['watch', 'nodemon', 'browser', 'server']);
