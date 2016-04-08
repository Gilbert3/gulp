
/* *****组件安装*****
* npm install gulp-sass gulp-uglify gulp-compass gulp-sourcemaps gulp-imagemin gulp-minify-css gulp-make-css-url-version gulp-rev-append gulp-concat gulp-rename gulp-jshint gulp-clean
* 
* *****项目结构*****
* gulp(项目名称)
*    |–.git 通过git管理项目会生成这个文件夹
*    |–node_modules 组件目录
*    |–dist 发布环境
*        |–css 样式文件(style.css style.min.css)
*        |–images 图片文件(压缩图片)
*        |–js js文件(main.js main.min.js)
*        |–index.html 静态文件(压缩html)
*    |–dev 生产环境
*        |–sass sass文件
*        |–images 图片文件
*        |–js js文件
*        |–index.html 静态文件
*    |–config.rb Compass配置文件
*    |-package.json 项目信息
*    |–gulpfile.js gulp任务文件
**/

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'),//本地安装gulp所用到的地方
    less = require('gulp-less') //less编辑
//    compass = require('gulp-compass'),          // compass编译Sass, 生成雪碧图
//    sass = require('gulp-sass'),                // sass编译
    sourcemaps = require('gulp-sourcemaps'),    // sass地图
//    rename = require('gulp-rename'),            // 重命名文件
//    jshint = require('gulp-jshint'),            // JS语法检测
//    uglify = require('gulp-uglify'),            // JS丑化
//    concat = require('gulp-concat'),            // JS拼接
//    imagemin = require('gulp-imagemin'),        // 图片压缩
//cssmin = require('gulp-minify-css'),     // 压缩CSS
//    cssver = require('gulp-make-css-url-version'),    // css文件引用URL加版本号
//    rev = require('gulp-rev-append'),           // html添加版本号
// 路径变量
// var path = {
//     // 开发环境
//     dev: {
//         html: './dev',
//         js: './dev/js',
//         sass: './dev/sass',
//         css: './dev/css',
//         images: './dev/images' 
//     },
//     // 发布环境
//     dist: {
//         html: './dist',
//         js: './dist/js',
//         css: './dist/css',
//         images: './dist/images' 
//     }
// };    
// 创建Compass任务，编译Sass生成雪碧图
//gulp.task('compass', function() {
//    gulp.src('./dev/sass/*.scss')
//        .pipe(compass({
//            config_file: './config.rb',    // 配置文件
//            css: './dev/css',             // 编译路径
//            sass: './dev/sass'        　 // sass路径
//            image: './dev/images'         // 图片路径，用于生成雪碧图
//        }))
//        .pipe(cssver())                    // CSS文件引用URl加版本号
//        .pipe(minifycss())                 // 压缩CSS
//        .pipe(gulp.dest('./dist/css'))    // 发布到线上版本
//        .pipe(reload({stream: true}));
//});
//// 图片压缩
//gulp.task('image', function() {
//    gulp.src('./dev/images/*.*')
//        .pipe(cache(imagemin()))
//        .pipe(reload({stream: true}))
//        .pipe(gulp.dest('./dis/images'));
//        //.pipe(notify({ message: '图片压缩'}));
//});
// 合并压缩JS文件
//gulp.task('script', function() {
//    gulp.src('./dev/js/*.js')
//        .pipe(concat('all.js'))            // 合并
//        .pipe(gulp.dest('./dist/js'))
//        .pipe(rename('all.min.js'))        // 重命名
//        .pipe(uglify())                    // 压缩
//        .pipe(gulp.dest('./dist/js'))
//        //.pipe(notify({ message: 'JS合并压缩' }))
//        .pipe(reload({stream: true}));
//});
// 清空文件夹
//gulp.task('clean', function() {
//    gulp.src(['./dist/css', './dist/js', './dist/images'], {read: false})
//        .pipe(clean());
//});
// 默认任务
gulp.task('testLess',function(){
    gulp.src('dev/less/*.less')
    //gulp.src(['src/less/index.less','src/less/detail.less']) //多个文件以数组形式传入
    //编译src目录下的所有less文件
    //除了reset.less和test.less（**匹配src/less的0个或多个子文件夹）
    //gulp.src(['src/less/*.less', '!src/less/**/{reset,test}.less'])
        .pipe(sourcemaps.init())
        .pipe(less())
        pipe(sourcemaps.write())
//    .pipe(cssmin({compatibility: 'ie7'}))//兼容IE7及以下需设置compatibility属性 .pipe(cssmin({compatibility: 'ie7'}))
    .pipe(gulp.dest('dist/css'));
});
gulp.task('default', ['testLess'],function() {
    gulp.start('testLess');
});

gulp.task('testWatch',function(){
    gulp.watch('dev/less/*.less',['testLess']);
});
