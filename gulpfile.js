

const gulp 			 = require('gulp');
const concat 		 = require('gulp-concat');
const rename 		 = require('gulp-rename');
const uglify 		 = require('gulp-uglify');
const plumber 	 = require('gulp-plumber');
const notify 		 = require('gulp-notify');
const babel 		 = require('gulp-babel');
const babelify 	 = require('babelify');
const util 			 = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const source 		 = require('vinyl-source-stream');
const buffer 		 = require('vinyl-buffer');
const browserify = require('browserify');
const merge 		 = require('merge-stream');


gulp.task('js:copy', function(){
	var PathFinding = gulp.src('./node_modules/pathfinding/src/PathFinding.js')
		.pipe(gulp.dest('dist/js/package/'));

	var OrbitControls = gulp.src('./node_modules/three/examples/js/controls/OrbitControls.js')
		.pipe(gulp.dest('dist/js/package/'));

	var TweenMax = gulp.src('./node_modules/gsap/src/minified/TweenMax.min.js')
		.pipe(gulp.dest('dist/js/package/'));

	var TimelineMax = gulp.src('./node_modules/gsap/src/minified/TimelineMax.min.js')
		.pipe(gulp.dest('dist/js/package/'));

  return merge(PathFinding, OrbitControls, TweenMax, TimelineMax);
})


gulp.task("img:copy", function(){
  return gulp.src("./src/img/**/*")
    .pipe(gulp.dest("./dist/assets/img/"));
});



gulp.task('js:prod', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './src/js/main.js', debug: true})
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/js'))
				.pipe(notify({ message: 'Scripts task complete' }));
});


gulp.task('js:dev', function () {
    // app.js is your main JS file with all your module inclusions
    return browserify({entries: './src/js/main.js', debug: true})
        .transform("babelify", { presets: ["env"] })
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./dist/js'))
				.pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', gulp.series('js:dev'));
});

gulp.task('default', gulp.series(gulp.parallel('js:prod')));
