const gulp = require('gulp')
const twig = require('gulp-twig')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const browserSync = require('browser-sync')
const reload = browserSync.reload

const src = {
  twig: {
    watch: 'src/twig/**',
    compile: 'src/twig/*.*'
  },
  scss: {
    watch: 'src/scss/**',
    compile: 'src/scss/*.*'
  }
}


// SCSS to CSS
gulp.task('scss', () => {
  return gulp.src(src.scss.compile)
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./dist/css'))
    // minified version
    .pipe(cssnano())
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream: true}))
})


// Twig to HTML
gulp.task('twig', () => {
  return gulp.src(src.twig.compile)
    .pipe(twig({ base: 'src/twig' }))
    .pipe(gulp.dest('./dist'))
    .on("end", reload)
})

gulp.task('serve', ['scss', 'twig'], () => {
  browserSync({
    server: './dist'
  })

  gulp.watch(src.scss.watch, ['scss'])
  gulp.watch(src.twig.watch, ['twig'])
})

gulp.task('default', ['serve'])
