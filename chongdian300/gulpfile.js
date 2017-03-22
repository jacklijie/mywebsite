var gulp = require('gulp'),
  sass = require('gulp-sass'), //sass编译
  //less = require('gulp-less'),//less编译
  concat = require('gulp-concat'), //文件合并
  uglify = require('gulp-uglify'), //js压缩
  pump = require('pump'), //配合gulp-uglify使用
  minifycss = require('gulp-minify-css'), //css压缩
  // imagemin = require('gulp-imagemin'),
  notify = require('gulp-notify'), //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
  plumber = require('gulp-plumber');

gulp.task("doCss", function() {
  return gulp.src("./dev/sass/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('chongdian300.css'))
    // .pipe(minifycss())
    .pipe(gulp.dest("./dist/css/"));
});

gulp.task('doJs', function() {
  return gulp.src(['./dev/js/**/*.js', '!dev/js/wage.js'])
    .pipe(plumber({
      errorHandler: notify.onError('Error: <%= error.message %>')
    }))
    .pipe(concat('chongdian300.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});

// gulp.task('doImg', function() {
//   return gulp.src('./dev/images/*')
//     .pipe(plumber({
//       errorHandler: notify.onError('Error: <%= error.message %>')
//     }))
//     .pipe(imagemin())
//     .pipe(gulp.dest('./dist/images/'));
// });

gulp.task('default', function() {
  gulp.watch("dev/sass/*.scss", ["doCss"]);
  gulp.watch("dev/js/**/*.js", ["doJs"]);
// gulp.watch("dev/images/*", ["doImg"]);
});
