var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var server = require("gulp-webserver");
var clean = require("gulp-clean-css");
var image = require("gulp-imagemin");
var htmlmin = require("gulp-htmlmin");
gulp.task("sev", function() {
    return gulp.src("../css/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("../css"));
})
gulp.task("watch", function() {
    gulp.watch("../css/*.scss", gulp.series("sev"));
})
gulp.task("uglify", function() {
    return gulp.src("../js/{a,index}.js")
        .pipe(concat("all.js"))
        .pipe(uglify())
        .pipe(gulp.dest("../dist/js"))
})
gulp.task("sass", function() {
    return gulp.src("../css/*.scss")
        .pipe(clean())
        .pipe(gulp.dest("../dist"))
})
gulp.task("server", function() {
    return gulp.src("../")
        .pipe(server({
            port: 2020,
            open: true,
            livereload: true
        }))
})
gulp.task("image", function() {
    return gulp.src("../img/*{.jpg,.png}")
        .pipe(image())
        .pipe(gulp.dest("../dist/img"))
})
gulp.task("htmlmin", function() {
    return gulp.src("../index.html")
        .pipe(htmlmin())
        .pipe(gulp.dest("../dist"));
})
gulp.task("dev", gulp.series("sev", "uglify", "server", "watch"))