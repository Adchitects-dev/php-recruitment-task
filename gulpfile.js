const { src, dest, watch, parallel } = require('gulp');

const sass = require('gulp-dart-sass');
sass.compiler = require('node-sass');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

function javascript(cb) {
	watch(['src/scripts.js'], function(cb) {
		return src('src/scripts.js')
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(uglify())
			.pipe(dest('dist/'));
	cb();
	});
}

function css(cb) {
	watch(['src/styles.scss'], function(cb) {
		return src('src/styles.scss')
			.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
			.pipe(dest('dist/'));
	cb();
	});
}

exports.watch = parallel(javascript, css);