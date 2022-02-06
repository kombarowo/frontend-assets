import del from 'del';
import gulp from 'gulp';
import path from './path.config.js';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackStream from 'webpack-stream';

const clean = () => del([path.clean], { force: true });

const compileStyles = () => {
    return gulp.src(path.src.styles).pipe(gulp.dest(path.dist.styles));
};

const compileScripts = () => {
    return gulp.src(path.src.scripts).pipe(webpackStream(webpackConfig, webpack)).pipe(gulp.dest(path.dist.scripts));
};

const watch = () => {
    gulp.watch(path.watch.styles, compileStyles);
    gulp.watch(path.watch.scripts, compileScripts);
};

const compileAll = gulp.parallel(compileStyles, compileScripts);
export const build = gulp.series(clean, compileAll);
export const dev = gulp.series(clean, compileAll, watch);
