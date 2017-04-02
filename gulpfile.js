var gulp = require("gulp");
var p = require("gulp-load-plugins")();
var pump = require("pump");

// Paths: [src, dest]
var vendor_scripts_paths = ["src/vendor-scripts/**/*.js", "assets/scripts/"];
var scripts_paths = ["src/scripts/**/*.js", "assets/scripts/"];
var styles_paths = ["src/styles/**/*.{sass,scss}", "assets/styles/"];

function scripts_pipeline (paths, concat, cb) {
  pump([
    gulp.src(paths[0]),
    p.sourcemaps.init(),
    p.uglify(),
    p.concat(concat),
    p.sourcemaps.write("."),
    gulp.dest(paths[1])
  ], cb);
}

// Vendor JS
gulp.task("vendor-scripts", function (cb) {
  scripts_pipeline(vendor_scripts_paths, "vendor.js", cb);
});

// JS
gulp.task("scripts", function (cb) {
  scripts_pipeline(scripts_paths, "scripts.js", cb);
});

// SASS
gulp.task("styles", function () {
  return gulp.src("src/styles/styles.sass")
    .pipe(p.sourcemaps.init())
    .pipe(p.sass().on("error", p.sass.logError))
    .pipe(p.autoprefixer())
    .pipe(p.sourcemaps.write("."))
    .pipe(gulp.dest(styles_paths[1]));
});

// Watch
gulp.task("watch", function () {
  gulp.watch(vendor_scripts_paths[0], ["vendor-scripts"]);
  gulp.watch(scripts_paths[0], ["scripts"]);
  gulp.watch(styles_paths[0], ["styles"]);
});