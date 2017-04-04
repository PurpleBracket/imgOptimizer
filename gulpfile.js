const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    watch = require('gulp-watch'),
    image = require('gulp-image');

var paths = {
    src: { root: 'imgSrc' },
    dist: { root: 'imgOptimized' },
    // public: { root: 'docs' },
    init: function() {
        this.src.images      = this.src.root + '/**/*.{jpg,jpeg,svg,png,gif}';
        this.dist.images     = this.dist.root;
        return this;
    },
}.init();

/* Minify and Copy Images */
gulp.task('images', () => {
    gulp.src(paths.src.images)
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            optimizationLevel: 10
        }))
        .pipe(gulp.dest(paths.dist.images));
});
watch(paths.src.images, () => {
    gulp.start('images');
});

gulp.task('default', ['images']);
