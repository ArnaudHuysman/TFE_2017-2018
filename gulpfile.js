

const gulp 			= require('gulp');
const concat 		= require('gulp-concat');
const rename 		= require('gulp-rename');
const uglify 		= require('gulp-uglify');
const plumber 		= require('gulp-plumber');
const notify 		= require('gulp-notify');
const babel 		= require('gulp-babel');
const util 			= require('gulp-util');





gulp.task('js:copy', function(){
	return gulp.src('./node_modules/three/build/three.js')
		.pipe(concat('three.js'))
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js/package/'));
    gulp.src('./node_modules/three/build/three.js')
    .pipe(concat('three.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/package/'));
})


gulp.task('js', function() {

  return gulp.src(['src/js/**/**/*.js'])
  	.pipe(babel({
  		presets: ['es2015']
  	}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .on('error', function (err) { util.log(util.colors.red('[Error]'), err.toString()); })
    .pipe(gulp.dest('dist/js'));
    //.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['js']);
});


gulp.task('default', ['watch', 'js']);
