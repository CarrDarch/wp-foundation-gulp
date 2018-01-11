var gulp = require('gulp'),
    $    = require('gulp-load-plugins')(),
    concat   = require('gulp-concat'),
    uglify  = require('gulp-uglify'),
    rename   = require('gulp-rename'),
    svgSprite    = require("gulp-svg-sprite"),
    svg2png     = require('gulp-svg2png'),
    imagemin = require('gulp-imagemin'),
    browserSync = require('browser-sync').create();

// Local site URL (without http://)
var SITE_URL = 'dev.wpgulp.local';

// Select Foundation components, remove components project will not use
var SOURCE = {
  scripts: [
    // Place custom JS here, files will be concantonated, minified if ran with --production
    'src/js/**/*.js',  
    ],
    // Scss files will be concantonated, minified if ran with --production
    styles: 'dist/css/**/*.css',
      
    // Images placed here will be optimized
    images: 'src/images/*',

    // SVGs
    svgs: 'src/svgs/*',
    
    php: '**/*.php'
};

var sassPaths = [
  'bower_components/normalize.scss/sass',
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

var config = {
    scripts: [
        // Foundation JS
        './src/js/app.js',
        // Eclipse Custom
        './src/js/eclipse-custom.js',
        // Any Custom Scripts
        './src/js/**/*.js'
    ]
};

// Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/eclipsecreative.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(config.scripts)
            .pipe(concat('eclipsecreative.js'))
            .pipe(gulp.dest('./assets/js/'))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(gulp.dest('./dist/js/'))
            .pipe(browserSync.stream());
});

// SVGs
gulp.task('sprites', function () {
    return gulp.src('**/*.svg', {cwd: './src/svgs'})
            .pipe(svgSprite({ shape: { transform: ['svgo'] }, mode: { defs: {dest: '.'} } } ) )
            .pipe(gulp.dest('./dist/svg/'));
});
// Create png version of each SVG
gulp.task('svg2png', function () {
    return gulp.src('./src/svgs/*.svg')
            .pipe(svg2png())
            .pipe(gulp.dest('./dist/svg/pngs/'))
            .pipe(browserSync.stream());
});

// Images
gulp.task('images', function () {
    gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.stream());
});

// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {
    // Watch these files
    var files = [
        SOURCE.styles,
        SOURCE.scripts,
        SOURCE.images,
        SOURCE.svgs,
        SOURCE.php,
    ];

    browserSync.init(files, {
        proxy: 'http://' + SITE_URL,
        host: SITE_URL,
        open: 'external',
    });
    
    gulp.watch(SOURCE.styles).on('change', browserSync.reload);
    gulp.watch(SOURCE.scripts).on('change', browserSync.reload);
    gulp.watch(SOURCE.images).on('change', browserSync.reload);

});


gulp.task('default', ['sass', 'scripts', 'sprites', 'svg2png', 'images', 'browsersync'], function() {
    gulp.watch(['src/scss/**/*.scss'], ['sass']);
    gulp.watch(['src/js/**/*.js'], ['scripts']);
    gulp.watch(['/src/svgs/*.svg'], ['sprites']);
    gulp.watch(['/src/images/**/*'], ['images']);
});
