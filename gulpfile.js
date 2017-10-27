var gulp         = require('gulp'),
    concat       = require('gulp-concat'),
    sass         = require('gulp-sass'),
    autoprefix   = require('gulp-autoprefixer'),
    uglify       = require('gulp-uglify'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    notify       = require('gulp-notify'),
    watch        = require('gulp-watch'),
    exec         = require('child_process').exec;

var scripts_src = [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/foundation-sites/dist/js/foundation.js',
    'bower_components/fancybox/src/jquery.fancybox.js',
    'bower_components/slick-carousel/slick/slick.js',
    'src/scripts/app.js'
];
var scripts_dist = 'src/assets';
var scss_src = [
    'src/scss/**/*.scss'
];
var scss_paths = [
    'bower_components/font-awesome/scss',
    'bower_components/slick-carousel/slick',
    'bower_components/foundation-sites/scss',
    'bower_components/fancybox/src/',
    'src/scss/**/*.scss'
];
var scss_dist = 'src/assets';

var plumberErrorHandler = { errorHandler: notify.onError({
    title: 'Gulp',
    message: 'Error: <%= error.message %>'
})};

gulp.task('default', [
    'scripts',
    'scss',
    'watch'
]);

gulp.task('scripts', function(){
    // app
    gulp.src(scripts_src)
        .pipe(concat('app.js'))
        .pipe(plumber(plumberErrorHandler))
        .pipe(gulp.dest(scripts_dist));
});

gulp.task('scss', function(){
    // minified
    gulp.src(scss_src).pipe(plumber(plumberErrorHandler))
        .pipe(sass({
            style:          "compressed",
            includePaths:   scss_paths,
            comments:       true,
            sourceComments: false
        }))
        .pipe(autoprefix('last 4 version'))
        .pipe(gulp.dest(scss_dist));
});

gulp.task('watch', function(){
    gulp.watch(scripts_src, ['scripts']);
    gulp.watch(scss_src, ['scss']);
});