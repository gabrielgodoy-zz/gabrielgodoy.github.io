var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    $ = require('gulp-load-plugins')(),
    cp = require('child_process');

gulp.task('watch', function () {
    gulp.watch('src/styl/**/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch(['**/*.html','index.html', '_includes/*.html', '_layouts/*.html', '_posts/*'], ['jekyll-rebuild']);
});

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

// Style
gulp.task('stylus', function() {
    return gulp.src('./src/styl/main.styl')
        .pipe($.sourcemaps.init())
        .pipe($.stylus({
            compress: true
        }))
        .pipe($.sourcemaps.write('.'))
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('./assets/css/'));
});

// Build the Jekyll Site
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});


// Browser Sync
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('default', ['stylus', 'browser-sync', 'watch']);
