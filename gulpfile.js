var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');

gulp.task('server', function() {
  return gulp.src(['src/js/index.jsx', 'src/js/components/**/*.jsx'], { base: 'src/js/' })
       .pipe(babel())
    .pipe(gulp.dest('build'));
});

gulp.task('browser', function() {
  return gulp.src('src/js/browser.jsx')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('public/js/'));
});

gulp.task('nodemon', ['server'], function() {
  nodemon({
    script: 'build/index.js',
    watch: 'build',
  });
});

gulp.task('watch', function() {
  gulp.watch(['src/js/index.jsx', 'src/js/components/**/*.jsx', 'src/index.nunjucks'], ['server']);
  gulp.watch(['src/js/browser.jsx', 'src/js/components/**/*.jsx'], ['browser']);
});

gulp.task('default', ['watch', 'nodemon', 'browser', 'server']);
