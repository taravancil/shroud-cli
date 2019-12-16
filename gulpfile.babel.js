import gulp from "gulp";
import babel from "gulp-babel";

gulp.task("compile", ["compile-lib", "compile-bin"]);

gulp.task("compile-lib", () => {
  gulp
    .src("lib/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("build/lib"));
});

gulp.task("compile-bin", () => {
  gulp
    .src("bin/*")
    .pipe(babel())
    .pipe(gulp.dest("build/bin"));
});

gulp.task("watch-bin", () => {
  gulp.watch("bin/*", ["compile-bin"]);
});

gulp.task("watch-lib", () => {
  gulp.watch("lib/**/*.js", ["compile-lib"]);
});

gulp.task("default", ["compile", "watch-lib", "watch-bin"]);
