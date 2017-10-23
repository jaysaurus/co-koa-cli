const gulp = require('gulp');
const uglifyES = require('uglify-es'); // can be a git checkout
const composer = require('gulp-uglify/composer');
const pump = require('pump');

const minify = composer(uglifyES, console);

// logs messages
gulp.task('message', () => {
  return console.log('Gulp is running...');
});

let minifyOptions = { ecma: 8 };
gulp.task('minifyJS', cb => {
  ['/app', '/.core/**/*', '/api/**/*'].forEach(dir => {
    pump([
      gulp.src(`src${dir}.js`),
      minify(minifyOptions),
      gulp.dest(`dist${dir.replace(/\/app|\/\*{2}\/\*$/g, '')}`)
    ]);
  });
});

gulp.task('copyConfigs', cb => {
  ['', 'config/', '.core/**', 'i18n/**'].forEach(dir => {
    pump([
      gulp.src(`src/${dir}/{${dir === 'config/' ? '*.js,' : ''}*.hbs,*.json,*.txt, *.md}`),
      gulp.dest(`dist/${dir.replace(/\/$|\/\*{2}$/g, '')}`)
    ]);
  });
});

gulp.task('build', ['minifyJS', 'copyConfigs']);
