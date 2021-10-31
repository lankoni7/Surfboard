const { task, src, dest, series, watch, parallel } = require("gulp");
const { DIST_PATH, SRC_PATH, STYLES_LIBS } = require("./gulp.config.js");
const rm = require("gulp-rm");
const sass = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const { stream } = require("browser-sync");
const browserSync = require("browser-sync").create();
const reload = browserSync.reload;
const autoprefixer = require("gulp-autoprefixer");
const gcmq = require("gulp-group-css-media-queries");
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const gulpIf = require("gulp-if");
const env = process.env.NODE_ENV;

task("clean", () => {
  return src(`${DIST_PATH}/**/*`, { read: false }).pipe(rm());
});

task("copy:html", () => {
  return src(`${SRC_PATH}/*.html`).pipe(dest(`${DIST_PATH}`));
});

task("copy:scripts", () => {
  return src(`${SRC_PATH}/*.js`).pipe(dest(`${DIST_PATH}`));
});

task("copy:img", () => {
  return src(`${SRC_PATH}/img/**/*`).pipe(dest(`${DIST_PATH}/img`));
});
task("copy:video", () => {
  return src(`${SRC_PATH}/video/**/*`).pipe(dest(`${DIST_PATH}/video`));
});

task("styles", () => {
  return src([...STYLES_LIBS, `${SRC_PATH}/styles/main.scss`])
    .pipe(gulpIf(env == "dev", sourcemaps.init()))
    .pipe(concat("main.scss"))
    .pipe(sass().on("error", sass.logError))
    .pipe(
      gulpIf(
        env == "prod",
        autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false,
        })
      )
    )
    .pipe(gulpIf(env == "prod", gcmq()))
    .pipe(gulpIf(env == "prod", cleanCSS()))
    .pipe(gulpIf(env == "dev", sourcemaps.write()))

    .pipe(gulpIf(env == "prod", dest(`${DIST_PATH}`)))
    .pipe(gulpIf(env == "dev", dest(`${SRC_PATH}`)));
});

task("server", () => {
  browserSync.init({
    server: {
      baseDir: "./src",
    },
    open: false,
  });
});

task("watch", () => {
  watch(`${SRC_PATH}/styles/**/*.scss`, series("styles"));
  // watch([
  //   `${SRC_PATH}/*.html`,
  //   `${SRC_PATH}/styles/**/*.scss`,
  //   `${SRC_PATH}/*.js`,
  // ]).on("change", reload);
});

task(
  "build",
  series(
    "clean",
    parallel("styles", "copy:html", "copy:scripts", "copy:img", "copy:video")
  )
);

task("default", series("styles", parallel("watch", "server")));
