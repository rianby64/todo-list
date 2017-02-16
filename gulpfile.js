'use strict';

const gulp     = require('gulp');
const htmlhint = require("gulp-htmlhint");
const eslint   = require('gulp-eslint');
const sass     = require('gulp-sass');
const connect  = require('gulp-connect');
const sassLint = require('gulp-sass-lint');
const gulpIf   = require('gulp-if');

const paths = {
  src:       'src',
  dst:       'dist',
  assetssrc: 'src/assets/**/*',
  assetsdst: 'dist/assets',
  sasssrc:   'src/**/*.s+(a|c)ss',
  htmlsrc:   'src/**/*.html',
  jssrc:     'src/**/*.js'
};

function isFixed(file) {
  // Has ESLint fixed the file contents?
  return file.eslint != null && file.eslint.fixed;
}

gulp.task('sass', () => {
  return gulp.src(paths.sasssrc)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.dst))
    .pipe(connect.reload());
});

gulp.task('sass-lint', () => {
  return gulp.src(paths.sasssrc)
    .pipe(sassLint())
    .pipe(sassLint.format());
});

gulp.task('assets-copy', () => {
  return gulp.src(paths.assetssrc)
    .pipe(gulp.dest(paths.assetsdst))
    .pipe(connect.reload());
});

gulp.task('html-hint', () => {
  return gulp.src(paths.htmlsrc)
    .pipe(htmlhint())
    .pipe(htmlhint.reporter());
});

gulp.task('html-copy', () => {
  return gulp.src(paths.htmlsrc)
    .pipe(gulp.dest(paths.dst))
    .pipe(connect.reload());
});

gulp.task('js-eslint', () => {
  return gulp.src(paths.jssrc, { base: './' })
    .pipe(eslint({fix: true}))
    .pipe(eslint.format())
    .pipe(gulpIf(isFixed, gulp.dest('./')));
});

gulp.task('js-copy', () => {
  return gulp.src(paths.jssrc)
    .pipe(gulp.dest(paths.dst))
    .pipe(connect.reload());
});

gulp.task('html-build', ['html-hint', 'html-copy']);
gulp.task('js-build', ['js-eslint', 'js-copy']);

gulp.task('watch', () => {
  gulp.watch(paths.htmlsrc, ['html-build']);
  gulp.watch(paths.jssrc, ['js-build']);
  gulp.watch(paths.sasssrc, ['sass-lint', 'sass']);
  gulp.watch(paths.assetssrc, ['assets-copy']);
});

gulp.task('connect', () => {
  connect.server({
    root: 'dist',
    port: 8080,
    livereload: true
  });
});

gulp.task('default', [
  'assets-copy',
  'html-build',
  'js-build',
  'sass-lint',
  'sass',
  'connect',
  'watch'
]);
