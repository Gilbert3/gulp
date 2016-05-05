//// 引入 gulp
var gulp = require('gulp');
// 引入组件  
var less = require('gulp-less'),//编译less
    minifycss = require('gulp-minify-css'),//css压缩 
    jshint = require('gulp-jshint'),//js检测
    uglify = require('gulp-uglify'),//js压缩
    imagemin = require('gulp-imagemin'),//图片压缩
    rename = require('gulp-rename'),//文件更名
    clean = require('gulp-clean'),//清空文件夹
    concat = require('gulp-concat'),//文件合并
    notify = require('gulp-notify'),//提示信息
    cache = require('gulp-cache'),//图片快取，只有更改过得图片会进行压缩
    livereload = require('gulp-livereload');//服务器控制客户端同步刷新（需配合chrome插件LiveReload及tiny-lr）
    server = livereload(),
    port = 35729,

// 样式less
gulp.task('less', function() {  
  return gulp.src('./dev/less/*.less')
    .pipe(less())//编译Sass
    // .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    // .pipe(concat('min.css'))
    // .pipe(gulp.dest('./dist/css'))
    // .pipe(rename({suffix: '.min'}))//修改文件更名
    // .pipe(minifycss())//css压缩
    .pipe(gulp.dest('./dist/css/'))
    .pipe(notify({ message: '样式任务完成' }));

});

// 脚本JavaScript
gulp.task('scripts', function() {  
  return gulp.src('./dev/js/*.js')
    // .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'))
    .pipe(notify({ message: '脚本任务完成' }));
});

//图片压缩
gulp.task('images', function() {  
  return gulp.src('./dev/images/*.{png,jpg,gif,ico}')
    .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
    .pipe(gulp.dest('./dist/images/'))
    .pipe(notify({ message: '图片压缩完成' }));
});

//清理
gulp.task('clean', function() {  
  return gulp.src(['./dist/css/'], {read: false})
    .pipe(clean());
});

//预设任务
gulp.task('default', ['clean'], function() {  
    // gulp.start('less', 'scripts', 'images');
    gulp.start('less');
});

// 看手
gulp.task('watch', function() {
    
  // 看守所有.less档
  gulp.watch('./dev/less/*.less', ['less']);

  // 看守所有.js档
  gulp.watch('./dev/js/*.js', ['scripts']);

  // 看守所有图片档
  gulp.watch('./dev/images/*.{png,jpg,gif,ico}', ['images']);

  // 建立即时重整伺服器
  var server = livereload();

  // // 看守所有位在 dist/  目录下的档案，一旦有更动，便进行重整
  gulp.watch(['./dist/**']).on('clean', function(file) {
    server.changed(file.path);
  });

});



