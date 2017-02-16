(function() {
  'use strict';
  /* eslint-disable */
  const gulp = require('gulp');
  const htmlhint = require('gulp-htmlhint');
  const eslint = require('gulp-eslint');
  const connect = require('gulp-connect');
  const csslint = require('gulp-csslint');

  const paths = {
    csssrc: ['./{*.css,**/*.css}',
             '!./resources/{*.css,**/*.css}',
             '!./dist/{*.css,**/*.css}',
             '!./node_modules/{*.css,**/*.css}'],
    htmlsrc: ['./{*.html,**/*.html',
              '!./resources/{*.html,**/*.html',
              '!./dist/{*.html,**/*.html',
              '!./node_modules/{*.html,**/*.html}'],
    jssrc: ['./*.js', './**/*.js',
            '!./resources/{*.js,**/*.js}',
            '!./dist/{*.js,**/*.js}',
            '!./node_modules/{*.js,**/*.js}']
  };

  gulp.task('css-lint', function() {
    return gulp.src(paths.csssrc)
      .pipe(csslint())
      .pipe(csslint.formatter())
      .pipe(connect.reload());
  });

  gulp.task('html-hint', _ => {
    return gulp.src(paths.htmlsrc)
      .pipe(htmlhint())
      .pipe(htmlhint.reporter());
  });

  gulp.task('js-eslint', _ => {
    return gulp.src(paths.jssrc)
      .pipe(eslint())
      .pipe(eslint.format());
  });

  gulp.task('watch', _ => {
    gulp.watch(paths.htmlsrc, ['html-hint']);
    gulp.watch(paths.jssrc, ['js-eslint']);
    gulp.watch(paths.csssrc, ['css-lint']);
  });

  gulp.task('connect', function() {
    connect.server({
      root: './',
      port: 8888,
      livereload: true
    });
  });

  gulp.task('default', [
    'css-lint',
    'html-hint',
    'js-eslint',
    'connect',
    'watch'
  ]);
})();
