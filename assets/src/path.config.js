import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    dist: {
        scripts: path.resolve(__dirname, '../dist', 'js'),
        styles: path.resolve(__dirname, '../dist', 'scss'),
    },
    src: {
        scripts: path.resolve(__dirname, '_js', '*.js'),
        styles: [path.resolve(__dirname, '_scss', '**', '*.scss')],
    },
    watch: {
        scripts: path.resolve(__dirname, '_js', '**', '*.js'),
        styles: path.resolve(__dirname, '_scss', '**', '*.scss'),
    },
    clean: path.resolve(__dirname, '../dist'),
};
