var gulp = require("gulp");
var gutil = require("gulp-util");
var mocha = require("gulp-mocha");

function runTests () {
    return gulp.src(["tests/*.js"], { read: false })
        .pipe(mocha({ reporter: "spec" }))
        .on("error", gutil.log);
}

gulp.task("test", runTests);

gulp.task("test-watch", () => {
    runTests();
    gulp.watch(["server/**", "client_src/**/*", "tests/**/*"], runTests);
});

