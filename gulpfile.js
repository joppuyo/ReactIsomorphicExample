var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var webpack = require('gulp-webpack');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('server', function() {
  return gulp.src(['src/js/config.js', 'src/js/index.jsx', 'src/js/components/**/*.jsx'], { base: 'src/js/' })
    .pipe(babel())
    .on('error', function(error) {
      console.error(error.message);
      console.error(error.codeFrame);
      this.emit('end');
    })
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
  gulp.watch(['src/js/config.js','src/js/index.jsx', 'src/js/components/**/*.jsx', 'src/index.nunjucks'], ['server']);
  gulp.watch(['src/js/browser.jsx', 'src/js/components/**/*.jsx'], ['browser']);
  gulp.watch(['src/scss/style.scss'], ['sass']);
});

gulp.task('sass', function () {
    gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('public/css/'));
});

gulp.task('default', ['watch', 'nodemon', 'browser', 'server', 'sass']);
