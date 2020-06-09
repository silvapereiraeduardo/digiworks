'use strict';

const {src, dest, series} = require('gulp');
const strip = require('gulp-strip-comments');
const del = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const zip = require('gulp-zip');
const {version} = require('./public/manifest.json');

const PATH_DIST = 'dist/';

function cleanCss() {
    return src('src/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(dest(PATH_DIST));
}

function cleanJs() {
    return src('src/*.js')
        .pipe(strip())
        .pipe(dest(PATH_DIST));
}

function copyHtml() {
    return src('src/*.html')
        .pipe(dest(PATH_DIST));
}

function copyAssets() {
    return src('src/assets/**/*')
        .pipe(dest(`${PATH_DIST}/assets/`));
}

function copyPublic() {
    return src('public/**/*')
        .pipe(dest(PATH_DIST));
}

function cleanDist() {
    return src('dist/*', {read: false})
        .pipe(del());
}

function build() {
    return src('dist/**/*')
        .pipe(zip(`v${version}.zip`))
        .pipe(dest('builds/'));
}

exports.build = build;

exports.default = series(cleanDist, copyPublic, copyAssets, copyHtml, cleanCss, cleanJs, build, cleanDist);

