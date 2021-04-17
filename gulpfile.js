/* eslint-disable no-undef */
const gulp = require('gulp')
const browserSync = require('browser-sync').create()
const sass = require('gulp-sass')
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
	gulp.watch(paths.styles.entry, sassCompile)
	gulp.watch(paths.templates.entry).on('change', browserSync.reload)
}

// Compile sass into CSS & auto-inject into browsers

function sassCompile() {
	return gulp.src(paths.styles.entry)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(browserSync.stream())
}

exports.serve = serve
exports.sass = sassCompile

