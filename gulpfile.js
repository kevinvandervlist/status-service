'use strict';

var gulp = require('gulp');
var typescript = require('gulp-tsc');
var clean = require('gulp-rimraf');
var mocha = require('gulp-mocha');
var tslint = require('gulp-tslint');
var stylish = require('tslint-stylish');

var targetLanguageLevel = 'es6';

function compileTypescript() {
    return typescript({
        module: "commonjs",
        target: targetLanguageLevel,
        sourceMap: true,
        removeComments: true,
        noImplicitAny: false,
        declaration: true,
        experimentalDecorators: true,
        emitDecoratorMetadata: true
    })
}

gulp.task('clean', function () {
    return gulp.src(['./dist/**/*', './testdist/**/*'], {read: false})
        .pipe(clean());
});

gulp.task('test-mocha', function () {
    return gulp.src('test/**/*.ts', {read: false})
        .pipe(compileTypescript())
        .pipe(gulp.dest('./testdist/'))
        .on('end', function () {
            return gulp.src('testdist/**/*.js', {read: false})
                .pipe(mocha({reporter: 'nyan'}));

        });
});

gulp.task('lint', function () {
    gulp.src(['src/**/*.ts', 'test/**/*.ts', '!./src/typings/**'])
        .pipe(tslint())
        .pipe(tslint.report(stylish, {
            emitError: true,
            sort: true
        }));
});

gulp.task('copy', function () {
    return gulp.src(['./src/**/*', '!./src/typings/**', '!./src/**/*.ts', '!./src/**/*.scss'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('typescript', function () {
    return gulp.src(['./src/**/*.ts', '!./src/typings/**'])
        .pipe(compileTypescript())
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', function() {
    gulp.watch(['test/**/*.ts'], ['test']);
});

gulp.task('build', ['clean', 'lint', 'typescript', 'copy']);
gulp.task('test', ['build', 'test-mocha']);
gulp.task('default', ['build', 'test']);
