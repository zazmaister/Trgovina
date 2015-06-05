var gulp = require('gulp');
var flatten = require('gulp-flatten');
var notify = require('gulp-notify');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

var autoprefixer = require("gulp-autoprefixer");
var minifycss = require("gulp-minify-css");
var rename = require("gulp-rename");    
var sass = require('gulp-sass');

gulp.task('sass', function () {
  gulp.src('./src/sass/**/*.scss')
    .pipe(sass({
            "sourcemap=none": true,
            style:            'expanded'
        }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'))
    .pipe(notify("SASS compiled!"));
});
// Task for moving index.html 
// and html templates to the dist folder
gulp.task('move', function(){

	//	Set the source
	gulp.src(['./src/index.html'])
	//	Pipe it and store it in the dist folder
	.pipe(gulp.dest('./dist'))
	//	Notify the user
	.pipe(notify('Moved index.html'));


	// Set the source. You can exclude files with !
	gulp.src(['!./src/index.html', './src/**/*.html'])
	// Remove any relative folders, subfolders
	.pipe(flatten())
	.pipe(gulp.dest('./dist/templates'))
	.pipe(notify('Moved templates'));

});

//	Task for concating and moving all js files
gulp.task('scripts', function(){

	gulp.src(['./src/app.js', './src/**/*.js'])
	// Concat all the js files into a single all.js file
	.pipe(concat('all.js'))
	.pipe(gulp.dest('./dist/js'))
	.pipe(notify('Generated all.js'));

});

//	Task for running a webserver
gulp.task('serve', function(){


	gulp.src('.')
	// Start a webserver with livereload on localhost:48080
	.pipe(webserver({
		port: 48080,
		livereload: true,
		open: 'http://localhost:48080/dist/'
	}));

});

//	Task for running watchers. When watch is called
//	the serve task will be called as well
gulp.task('watch', ['serve'], function(){

	//	Run tasks on start
	gulp.start(['scripts', 'move', "sass"]);

	//	Create a watcher that will run the scripts task
	//	anytime a .js file changes
	gulp.watch(['./src/**/*.js'], ['scripts']);
	gulp.watch(['./src/**/*.html'], ['move']);
	gulp.watch(["./src/sass/**/*.scss"], ["sass"]);
});




















