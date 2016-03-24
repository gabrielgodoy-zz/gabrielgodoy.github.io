'use strict';

var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    pl = require('gulp-load-plugins')(),
    cp = require('child_process');

function jumpError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('watch', function() {
    gulp.watch('assets/_styl/**/*.styl', ['stylus']);
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch([
        '**/*.html',
        '**/*.md',
        'index.html',
        '_includes/*.html',
        '_layouts/*.html',
        '_posts/*'
    ], ['jekyll-rebuild']);
});

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> jekyll build'
};

// Style
gulp.task('stylus', function() {
    return gulp.src('./assets/_styl/main.styl')
        .pipe(pl.sourcemaps.init())
        .pipe(pl.stylus({
            compress: true
        }))
        .on('error', jumpError)
        .pipe(pl.autoprefixer('last 2 versions'))
        .pipe(pl.sourcemaps.write('.'))
        .on('error', jumpError)
        .pipe(gulp.dest('_site/assets/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
        .pipe(gulp.dest('./assets/css/'));
});

// Build the Jekyll Site
gulp.task('jekyll-build', function(done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {
            stdio: 'inherit'
        })
        .on('close', done);
});

// Rebuild Jekyll & do page reload
gulp.task('jekyll-rebuild', ['jekyll-build'], function() {
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
