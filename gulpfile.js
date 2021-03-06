'use strict';

var gulp   = require('gulp');
var plugins = require('gulp-load-plugins')();

var paths = {
  lint: ['./gulpfile.js', './test/grammar.test.js'], // don't lint the js generated by jison for now
  watch: ['./gulpfile.js', './lib/grammar.jison', './test/**/*.js', '!test/{temp,temp/**}'],
  tests: ['./test/**/*.js', '!test/{temp,temp/**}'],
  grammar: ['./lib/grammar.jison'],
  source: ['./lib/grammar.js']
};

var plumberConf = {};

if (process.env.CI) {
  plumberConf.errorHandler = function(err) {
    throw err;
  };
}

gulp.task('lint', function () {
  return gulp.src(paths.lint)
    .pipe(plugins.jshint('.jshintrc'))
    .pipe(plugins.plumber(plumberConf))
    .pipe(plugins.jscs())
    .pipe(plugins.jshint.reporter('jshint-stylish'));
});

gulp.task('istanbul', function (cb) {
  gulp.src(paths.source)
    .pipe(plugins.istanbul()) // Covering files
    .on('finish', function () {
      gulp.src(paths.tests)
        .pipe(plugins.plumber(plumberConf))
        .pipe(plugins.mocha())
        .pipe(plugins.istanbul.writeReports()) // Creating the reports after tests runned
        .on('finish', function() {
          process.chdir(__dirname);
          cb();
        });
    });
});


gulp.task('build', plugins.shell.task([
  'rm lib/grammar.js; jison -o lib/grammar.js --parser-type lalr lib/grammar.jison'
]));

gulp.task('bump', ['test'], function () {
  var bumpType = plugins.util.env.type || 'patch'; // major.minor.patch

  return gulp.src(['./package.json'])
    .pipe(plugins.bump({ type: bumpType }))
    .pipe(gulp.dest('./'));
});

gulp.task('watch', ['test'], function () {
  gulp.watch(paths.watch, ['test']);
});

gulp.task('test', ['build', 'istanbul']);

gulp.task('release', ['bump']);

gulp.task('default', ['build']);
