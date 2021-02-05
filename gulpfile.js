var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

function copyHTML() {
    return gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./dist/'))
        .pipe(
            browserSync.reload({
                stream: true,
            }),
        );
}

function scss() {
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./dist/css'))
          .pipe(
              browserSync.reload({
                  stream: true,
              }),
          );
}


function broswer() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        port: 8080,
    });
};


function watch(){
    gulp.watch('./src/**/*.html',gulp.series(copyHTML))
    gulp.watch('./src/scss/**/*.scss', gulp.series(scss))
}


// exports.copy = copyHTML;
// exports.scss = scss;
exports.default = gulp.series(copyHTML, scss, gulp.parallel(broswer, watch));