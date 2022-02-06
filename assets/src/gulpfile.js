import cssmin from 'gulp-cssnano';
import dartSass from 'sass';
import del from 'del';
import gulp from 'gulp';
import gulpSass from 'gulp-sass';
import path from './path.config.js';
import prefixer from 'gulp-autoprefixer';
import webpackConfig from './webpack.config.js';
import webpackCore from 'webpack';
import webpackStream from 'webpack-stream';

const scss = gulpSass(dartSass);
const clean = () => del([path.clean], { force: true });

const compileStyles = () => {
    return gulp
        .src(path.src.styles)
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(prefixer({ overrideBrowserslist: ['last 3 versions'] }))
        .pipe(cssmin())
        .pipe(gulp.dest(path.dist.styles));
};

const compileScripts = () => {
    return gulp
        .src(path.src.scripts)
        .pipe(webpackStream(webpackConfig, webpackCore))
        .pipe(gulp.dest(path.dist.scripts));
};

const watch = () => {
    gulp.watch(path.watch.styles, compileStyles);
    gulp.watch(path.watch.scripts, compileScripts);
};

const compileAll = gulp.parallel(compileStyles, compileScripts);
export const build = gulp.series(clean, compileAll);
export const dev = gulp.series(clean, compileAll, watch);
