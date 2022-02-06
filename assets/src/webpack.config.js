import { fileURLToPath } from 'url';
import glob from 'glob';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MODE = process.argv[2];

export default {
    stats: MODE === 'dev' ? 'summary' : 'normal',
    mode: MODE === 'dev' ? 'development' : 'production',
    devtool: MODE === 'dev' ? 'source-map' : false,
    entry: {
        main: ['@babel/polyfill', path.resolve(__dirname, '_js', 'main.js')],
        ...glob.sync(path.resolve(__dirname, '_js', 'entries', '*.js')).reduce((obj, el) => {
            obj[path.parse(el).name] = el;
            return obj;
        }, {}),
    },
    output: {
        path: path.resolve(__dirname, '../dist', 'js'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        ],
    },
};
