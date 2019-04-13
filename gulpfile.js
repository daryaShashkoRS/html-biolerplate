const
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename");
    browsersync = require('browser-sync').create();

sass.compiler = require('node-sass');

const build = './build';
const src = './src';


const path = {
    build: {
        views: build,
        styles: build,
        images: `${build}/images/`,
        fonts: `${build}/fonts/`,
    },
    src: {
        views: `${src}/*.html`,
        styles: `${src}/styles/index.scss`,
        images: `${src}/assets/images/**/*.*`,
        fonts: `${src}/assets/fonts/**/*.*`,
    }
};

gulp.task('styles', function () {
    return gulp.src(path.src.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename('styles.css'))
        .pipe(gulp.dest(path.build.styles));
});

gulp.task('images', function () {
    return gulp.src(path.src.images)
        .pipe(gulp.dest(path.build.images));
});

gulp.task('fonts', function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('html', function () {
    gulp.src(path.src.views)
        .pipe(gulp.dest(path.build.views));
});

var SYNC_CONFIG = {
    port: 3030,
    https: true,
    server: {
        // SUPPORT PORTAL
        baseDir: './build'
    },
    open: true,
    notify: false
};

gulp.task('browsersync', function () {
    browsersync.init(SYNC_CONFIG);
    browsersync.watch('build', browsersync.reload())
});

gulp.task('watch', function () {
    gulp.watch('./src/styles/**/*.scss', ['styles']);
    gulp.watch('./src/*.html', ['html']);
    gulp.watch('./src/assets/images/*.*', ['images']);
    gulp.watch('./src/assets/fonts/*.*', ['fonts']);
});

gulp.task('default', ['html', 'styles', 'images', 'fonts', 'watch', 'browsersync']);