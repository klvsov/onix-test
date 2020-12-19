const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const watch = require('gulp-watch');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const cssnano = require('gulp-cssnano');

gulp.task('scss', function (callback) {
  return gulp
    .src('./src/main.scss')
    .pipe(
      plumber({
        errorHandler: notify.onError(function (err) {
          return {
            title: 'Styles',
            sound: false,
            message: err.message,
          };
        }),
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 4 versions'],
      })
    )
    .pipe(sourcemaps.write())
    .pipe(cssnano())
    .pipe(gulp.dest('./build/css/'));
  callback();
});

gulp.task('watch', function () {
  watch(
    ['./build/*.html', './build/css/*.css'],
    gulp.parallel(browserSync.reload)
  );

  watch('./src/*.scss', function () {
    setTimeout(gulp.parallel('scss'), 1000);
  });
});

gulp.task('server', function () {
  browserSync.init({
    server: {
      baseDir: './build/',
    },
  });
});

gulp.task('default', gulp.parallel('server', 'watch', 'scss'));
