/*-----------------------------------Gulp configuration-----------------------------------*/
//plugins
const gulp = require('gulp'); //npm install gulp --save-dev
const importCss = require('gulp-import-css'); //npm install gulp-import-css --save-dev
const sass = require('gulp-sass'); //npm install gulp-sass --save-dev
const less = require('gulp-less'); //npm install gulp-less --save-dev
const gutil = require('gulp-util'); //npm install gulp-util --save-dev
const autoprefixer = require('gulp-autoprefixer'); //npm install gulp-autoprefixer --save-dev
const shorthand = require('gulp-shorthand'); //npm install gulp-shorthand --save-dev
const cleancss = require('gulp-clean-css'); //npm install gulp-clean-css --save-dev
const concat = require('gulp-concat'); //npm install gulp-concat --save-dev
const uglify = require('gulp-uglify'); //npm install gulp-uglify --save-dev
const image = require('gulp-image'); //npm install gulp-image --save-dev
const browserSync = require('browser-sync').create(); //npm install browser-sync --save-dev
const argv = require('yargs').argv; //npm install yargs --save-dev
const merge = require('merge-stream'); // npm install gulp merge-stream --save-dev
const fileinclude = require('gulp-file-include'); //npm install gulp-file-include --save-dev
const htmlmin = require('gulp-htmlmin'); //npm install gulp-htmlmin --save-dev
const babel = require('gulp-babel'); //npm install --save-dev gulp-babel babel-preset-es2015 babel-plugin-transform-runtime
//Path
var path = {
    libSrc: [
        'src/library/jquery-3.1.1.js' //Assign your library by adding ','(Comma)
    ],
    polySrc: [
        'src/library/html5.js',
        'src/library/css3.js',
        'src/library/respond.js' //Assign your polyfill by adding ','(Comma)
    ]
};
//Html
gulp.task('html', function() {
    gulp.src('src/template/pages/*.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: 'src/template/pages/'
        }))
        .pipe(gulp.dest('src/html/'));
});
//Html Minification
gulp.task('Htmlmin', function() {
    gulp.src('src/html/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('src/html/'));
});
//Css
gulp.task('css', function() {
    return gulp.src(['src/css/*.css'])
        .pipe(importCss())
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(gulp.dest('src/html/assets/css/'));
});
//Css Minification
gulp.task('Cssmin', function() {
    return gulp.src(['src/html/assets/css/*.css'])
        .pipe(cleancss({ compatibility: '*' }))
        .pipe(gulp.dest('src/html/assets/css/'));
});
//Sass
gulp.task('sass', function() {
    return gulp.src(['src/sass/**/*.scss'])
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(gulp.dest('src/html/assets/css/'));
});
//Less
gulp.task('less', function() {
    return gulp.src(['src/less/*.less'])
        .pipe(less({
            paths: ['src/less/']
        }).on('error', function(err) {
            gutil.log(err);
            this.emit('end');
        }))
        .pipe(autoprefixer({
            browsers: ['> 0%'],
            cascade: false
        }))
        .pipe(shorthand())
        .pipe(gulp.dest('src/html/assets/css/'));
});
//Image
gulp.task('Imagemin', function() {
    gulp.src('src/html/assets/images/**/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            jpegoptim: true,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10
        }))
        .pipe(gulp.dest('src/html/assets/images/compressed'));
});
//Js Concat
gulp.task('Lib', function() {
    var lib = gulp.src(path.libSrc)
        .pipe(concat('lib.js'))
        .pipe(gulp.dest('src/html/assets/js/'));
    var poly = gulp.src(path.polySrc)
        .pipe(concat('polyfill.js'))
        .pipe(gulp.dest('src/html/assets/js/'));
    return merge(lib, poly);
});
//Js Minification
gulp.task('Jsmin', function() {
    if (argv.lib) {
        return gulp.src('src/html/assets/js/lib.js')
            .pipe(concat('lib.js'))
            .pipe(uglify().on('error', function(e) {
                console.log(e);
            }))
            .pipe(gulp.dest('src/html/assets/js/'));
    } else if (argv.poly) {
        return gulp.src('src/html/assets/js/polyfill.js')
            .pipe(concat('polyfill.js'))
            .pipe(uglify().on('error', function(e) {
                console.log(e);
            }))
            .pipe(gulp.dest('src/html/assets/js/'));
    } else if (argv.ui) {
        return gulp.src('src/html/assets/js/ui.js')
            .pipe(concat('ui.js'))
            .pipe(uglify().on('error', function(e) {
                console.log(e);
            }))
            .pipe(gulp.dest('src/html/assets/js/'));
    }
});
//ES6 to ES5
gulp.task('es6', function() {
    return gulp.src('src/js/ui.js')
        .pipe(babel({
            plugins: ['transform-runtime'],
            presets: ['es2015']
        }))
        .on('error', function(e) {
            console.log('>>> ERROR', e);
            this.emit('end');
        })
        .pipe(gulp.dest('src/html/assets/js/'));
});
//Default
gulp.task('default', function() {
    browserSync.init({
        //proxy: "/", //for static dev
        server: {
            baseDir: './src/html/' //for local(system) dev
        },
        ghostMode: false,
        ui: false,
        online: false,
        port: Math.floor(Math.random() * 8999 + 1000) //mention your port number to override default port 
    });
    gulp.watch('src/template/**/*.html', ['html']);
    if (argv.Scss) {
        gulp.watch('src/sass/**/*.scss', ['sass']);
    } else if (argv.Less) {
        gulp.watch('src/less/**/*.less', ['less']);
    } else {
        gulp.watch('src/css/**/*.css', ['css']);
    }
    gulp.watch('src/js/*.js', ['es6']);
    gulp.watch(['src/html/*.html', 'src/html/assets/css/*.css', 'src/html/assets/js/*.js', 'src/html/assets/fonts/**/*.*', 'src/html/assets/images/**/*.*]']).on('change', browserSync.reload);
});