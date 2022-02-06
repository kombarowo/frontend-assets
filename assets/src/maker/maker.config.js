import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entries: {
        js: {
            path: path.resolve('_js', 'entries'),
            template: path.resolve(__dirname, 'templates', 'e-template.js'),
        },
        htm: {
            path: path.resolve('../', '../', 'pages'),
            template: path.resolve(__dirname, 'templates', 'e-template.htm'),
        },
        scss: {
            path: path.resolve('_scss', 'entries'),
            template: path.resolve(__dirname, 'templates', 'e-template.scss'),
        },
    },
    modules: {
        js: {
            path: path.resolve('_js', 'modules', '{entry}'),
            template: path.resolve(__dirname, 'templates', 'm-template.js'),
            placeholder: '// {placeholder}',
            placeholder2: '// {placeholder-2}',
            entryPath: path.resolve('_js', 'entries'),
            pattern: 'import {entry}{Value} from "@jm/{entry}/{entry}-{value}.js";\n// {placeholder}',
            pattern2: '{entry}{Value}();\n\t// {placeholder-2}',
        },
        htm: {
            path: path.resolve('../', '../', 'partials', '{entry}'),
            template: path.resolve(__dirname, 'templates', 'm-template.htm'),
            placeholder: '{# {placeholder} #}',
            entryPath: path.resolve('../', '../', 'pages'),
            pattern: '{% partial "{entry}/{entry}-{value}" %}\n\t\t{# {placeholder} #}',
        },
        scss: {
            path: path.resolve('_scss', 'components', '{entry}'),
            template: path.resolve(__dirname, 'templates', 'm-template.scss'),
            placeholder: '// {placeholder}',
            entryPath: path.resolve('_scss', 'entries'),
            pattern: '@import "./components/{entry}/{entry}-{value}.scss";\n// {placeholder}',
        },
    },
};
