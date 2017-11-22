const gulp = require('gulp');

function generateNGDocs() {
    const gulpDocs = require('gulp-ngdocs');

    return gulp.src(['./src/*.js', './src/**/*.js', '!./demo/*.js'])
        .pipe(gulpDocs.process())
        .pipe(gulp.dest('./docs'));
}


function connectDocs() {
    const connect = require('gulp-connect');
    connect.server({
        root: 'docs',
        livereload: true,
        fallback: 'docs/index.html',
        port: 8083
    });
}

gulp.task('docs:serve', connectDocs);
gulp.task('docs:generate', generateNGDocs);
