let gulp = require('gulp');
let rename = require('gulp-rename');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let sourcemaps = require('gulp-sourcemaps');
let browserSync = require('browser-sync').create();
let uglify = require('gulp-uglify-es').default;

function style(done) {

    gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            overrideBrowserslist: ['> 0.1%'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());

    done();
}


function sync(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 3000
    });
    done();
}

function browserReload(done) {

    browserSync.reload();

    done();
}

function scripts(done) {
    gulp.src('./src/js/**/*.js')
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());
    done();
}


function watchFiles() {
    gulp.watch("./src/scss/**/*", style);
    gulp.watch("./**/*.html", browserReload);
    gulp.watch("./src/js/**/*.js", browserReload);
}

gulp.task('default', gulp.parallel(sync, watchFiles));
gulp.task(style);
gulp.task(scripts);
