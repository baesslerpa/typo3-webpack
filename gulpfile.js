/* eslint-disable no-undef */
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const webpack = require('webpack-stream')
const sass = require('gulp-sass')
// eslint-disable-next-line no-unused-vars
const debug = require('gulp-debug')

const extname = 'test'
const devDomain = 'local.webpack.net'

const paths = {
	styles: {
		entry: `packages/${extname}/Resources/Public/Scss/**/*.scss`,
		output: `packages/${extname}/Resources/Public/Css/`
	},
	templates: {
		entry: `packages/${extname}/Resources/Private/**/*.html`
	},
	scripts: {
		srcBundle: `packages/${extname}/Resources/Public/Javascript/Src/**/_*.js`,
		src: [`packages/${extname}/Resources/Public/Javascript/Src/**/*.js`, `!packages/${extname}/Resources/Public/Javascript/Src/**/_*.js`],
		dest: `packages/${extname}/Resources/Public/Javascript/Dist`
	}
}


// Static Server + watching scss/html files
function serve() {
	browserSync.init({
		proxy: devDomain,
	})
	gulp.watch(paths.scripts.src, webpackWatch)
	gulp.watch(paths.styles.entry, sassCompile)
	gulp.watch(paths.templates.entry).on('change', browserSync.reload)
}

function webpackWatch() {
	return gulp.src(paths.scripts.src)
		.pipe(webpack({
			output: {
				filename: '[name].bundled.js',
			}
		}))
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(browserSync.stream())
}

// Compile sass into CSS & auto-inject into browsers
function sassCompile() {
	console.log('sass')
	return gulp.src(paths.styles.entry)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(browserSync.stream())
}


exports.sass = sassCompile
exports.webpack = webpackWatch
exports.serve = serve
