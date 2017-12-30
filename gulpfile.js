const gulp = require('gulp');
// const composer = require('gulp-uglify/composer');
const pump = require('pump');
// const uglifyES = require('uglify-es'); // can be a git checkout

// const minify = composer(uglifyES, console);

// logs messages
gulp.task('message', () => {
  return console.log('Gulp is running...');
});

// let minifyOptions = { ecma: 8 };
// gulp.task('minifyJS', cb => {
//   pump([
//     gulp.src(`src/.core/**/*.js`),
//     minify(minifyOptions),
//     gulp.dest(`dist/.core`)
//   ]);
// });

gulp.task('copyAPI', cb => {
  ['Enums.js', 'controllers/IndexController.js'].forEach(dir => {
    const arr = dir.split('/');
    let str = '';
    if (arr.length > 1) {
      for (let i = 0; i <= (arr.length - 2); i++) {
        str = `dist/api/${arr[i]}`;
      }
    } else str = 'dist/api';
    pump([
      gulp.src(`src/api/${dir}`),
      gulp.dest(str)
    ]);
  });
});

gulp.task('copyMisc', cb => {
  ['', 'config/**/'].forEach(dir => {
    const dest = (dir) ? `/${dir.replace(/\/$|\/\*{2}\/$/g, '')}` : '';
    pump([
      gulp.src(`src/${dir}{*.js,*.hbs,*.json,*.txt,*.md,LICENSE}`),
      gulp.dest(`dist${dest}`)
    ]);
  });
  pump([
    gulp.src('src/public/html/index.html'),
    gulp.dest('dist/public/html')
  ]);
});

gulp.task('build', ['copyAPI', 'copyMisc'], () => {
  console.log('build succeeded.');
});
