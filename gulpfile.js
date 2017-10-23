const gulp = require('gulp');
const composer = require('gulp-uglify/composer');
const pump = require('pump');
const uglifyES = require('uglify-es'); // can be a git checkout

const minify = composer(uglifyES, console);

// logs messages
gulp.task('message', () => {
  return console.log('Gulp is running...');
});

let minifyOptions = { ecma: 8 };
gulp.task('minifyJS', cb => {
  pump([
    gulp.src(`src/.core/**/*.js`),
    minify(minifyOptions),
    gulp.dest(`dist/.core`)
  ]);
});

gulp.task('copyConfigs', cb => {
  ['', 'config/**/', '.core/**/'].forEach(dir => {
    pump([
      gulp.src(`src/${dir}{${!dir.match('.core') ? '*.js,' : ''}*.hbs,*.json,*.txt,*.md,LICENSE}`),
      gulp.dest(`dist/${dir.replace(/\/$|\/\*{2}\/$/g, '')}`)
    ]);
  });
});

gulp.task('build', ['minifyJS', 'copyConfigs'], () => {
  console.log('build succeeded.');
});
