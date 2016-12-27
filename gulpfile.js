'use strict';

var gulp = require('gulp'),
    jeet = require("jeet"),
    rupture = require("rupture"),
    browserSync = require('browser-sync'),
    pl = require('gulp-load-plugins')(),
    childProcess = require('child_process'),
    env = require('minimist')(process.argv.slice(2));

function jumpError(error) {
    console.log(error.toString());
    this.emit('end');
}

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> jekyll build'
};


/* =============================================================
 Browser Sync
 */
gulp.task('browser-sync', ['jekyll-build'], () => {
    browserSync({
        server: {
            baseDir: ['_site', './']
        },
        notify: false
    });
});

/* =============================================================
 Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
    browserSync.reload();
});

/* =============================================================
 Style
 */
gulp.task('stylus', () => {
    return gulp.src('./assets/_styl/main.styl')
        .on('error', jumpError)
        .pipe(pl.sourcemaps.init())
        .pipe(pl.stylus({
            compress: true,
            use: [jeet(), rupture()]
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

/* =============================================================
 Javascript
 */
gulp.task('js', () => {
    return gulp.src((env.prod) ? ['assets/js/*.js', '!assets/js/main.js'] : ['assets/js/*.js', '!assets/js/analytics.js', '!assets/js/main.js'])
        .on('error', jumpError)
        .pipe(pl.concat('main.js'))
        .pipe(pl.uglify())
        .pipe(gulp.dest('assets/js/'));
});

/* =============================================================
 Watcher
 */
gulp.task('watch', () => {
    gulp.watch('assets/_styl/**/*.styl', ['stylus', 'jekyll-rebuild']);
    gulp.watch(['assets/js/**/*.js', '!assets/js/main.js'], ['js', 'jekyll-rebuild']);
    gulp.watch([
        '**/*.md',
        '_posts/**/*.*',
        '**/*.html',
        'index.html',
        '_includes/*.html',
        '_layouts/*.html',
        'projects/_posts/*',
        '!_site/**/*.html'
    ], ['jekyll-rebuild']);
});

/* =============================================================
 Build the Jekyll Site
 */
gulp.task('jekyll-build', (done) => {
    browserSync.notify(messages.jekyllBuild);
    return childProcess.spawn('jekyll', ['build', '--drafts'], {
        stdio: 'inherit'
    }).on('close', done);
});

gulp.task('default', ['stylus', 'js', 'browser-sync', 'watch']);
