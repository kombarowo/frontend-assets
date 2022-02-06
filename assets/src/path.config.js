import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    dist: {
        scripts: path.resolve(__dirname, '../dist', 'js'),
        styles: path.resolve(__dirname, '../dist', 'css'),
    },
    src: {
        scripts: [path.resolve(__dirname, '_js', 'main.js'), path.resolve(__dirname, '_js', 'entries', '*.js')],
        styles: [path.resolve(__dirname, '_scss', 'main.scss'), path.resolve(__dirname, '_scss', 'entries', '*.scss')],
    },
    watch: {
        scripts: path.resolve(__dirname, '_js', '**', '*.js'),
        styles: path.resolve(__dirname, '_scss', '**', '*.scss'),
    },
    clean: path.resolve(__dirname, '../dist'),
};
