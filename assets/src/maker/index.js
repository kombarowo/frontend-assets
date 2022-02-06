/* imports */
import chalk from 'chalk';
import config from './maker.config.js';
import fs from 'fs';
import path from 'path';

/**
 * Get arguments from console command
 * Command example №1: ... e(type) products(entities) - single entrie
 * Command example №2: ... m(type) products-slider(entities) jsh(langs) - single module
 * Command example №3: ... m(type) products,categories,news(entities) - multiple entries
 * Command example №4: ... m(type) products-slider,products-block1,products-block2(entities) - multiple modules
 * @property {string} type
 * @property {array} entities
 * @property {array} langs
 */
const CONSOLE_ARGUMETNS = {
    type: process.argv[2] || '',
    entities: process.argv[3] ? process.argv[3].split(',') : [],
    langs: process.argv[4] ? process.argv[4].split('') : [],
};

const { type, entities, langs } = CONSOLE_ARGUMETNS;

switch (type) {
    case 'e':
        entities.forEach((value) => {
            console.info(chalk.yellow(`Creating ${value} ...`));
            createEntries(value);
            console.info('\n');
        });
        break;
    case 'm':
        entities.forEach((value) => {
            console.info(chalk.yellow(`Creating ${value} ...`));
            createModules(value, langs);
            console.info('\n');
        });
        break;
    default:
        console.info(chalk.red('Unknown type parameter'));
        break;
}

function createEntries(value) {
    Object.entries(config.entries).forEach(([lang, options]) => {
        try {
            /* Make directory */
            _makeDir(options.path);

            /* Write files to directory */
            const filePath = path.resolve(options.path, `${value}.${lang}`);
            const fileContent = _bindValues(_readFile(options.template), {
                '{value}': value,
            });

            _writeFile(filePath, fileContent);
        } catch (error) {
            console.info(chalk.red(error));
        }
    });
}

function createModules(value, languages) {
    const [entryName, moduleName] = value.split('-');

    Object.entries(config.modules).forEach(([lang, options]) => {
        if (languages.includes(lang.slice(0, 1))) {
            try {
                /* Make directory */
                const entryFilePath = path.resolve(options.entryPath, `${entryName}.${lang}`);

                if (!fs.existsSync(entryFilePath)) {
                    throw new Error(`${entryName} is not exists`);
                }

                const dirPath = _bindValues(options.path, { '{entry}': entryName });

                _makeDir(dirPath);

                /* Write files to directory */
                const fileName = `${entryName}-${moduleName}.${lang}`;
                const filePath = path.resolve(dirPath, fileName);
                const fileContent = _bindValues(_readFile(options.template), {
                    '{value}': moduleName,
                    '{Value}': capitalize(moduleName),
                    '{entry}': entryName,
                });

                _writeFile(filePath, fileContent, true);

                /* Insert module to entry file */
                _updateFile(entryFilePath, {
                    [options.placeholder]: options.pattern,
                    [options.placeholder2]: options.pattern2,
                });
                _updateFile(entryFilePath, {
                    '{value}': moduleName,
                    '{Value}': capitalize(moduleName),
                    '{entry}': entryName,
                });

                console.info(chalk.green(`${entryFilePath} has been updated!`));
            } catch (error) {
                console.info(chalk.red(error));
            }
        }
    });
}

/* Make dir */
function _makeDir(dirpath) {
    if (fs.existsSync(dirpath)) {
        return;
    }

    fs.mkdirSync(dirpath, { recursive: true }, _makeDirCallback);
}

function _makeDirCallback(err) {
    if (err) {
        console.info(chalk.red(err));
        throw err;
    }
}

/* Write file */
function _writeFile(filepath, content, throwing = false) {
    if (fs.existsSync(filepath)) {
        if (throwing) {
            throw new Error(chalk.red(filepath + ' is already exists'));
        } else {
            console.info(chalk.red(filepath + ' is already exists'));
        }
        return;
    }

    fs.writeFileSync(filepath, content, { encoding: 'utf-8' });
    console.info(chalk.green(`${filepath} has been created!`));
}

/* Update file */
function _updateFile(filepath, bindMap) {
    if (!fs.existsSync(filepath)) {
        throw new Error(filepath + ' is not exists');
    }

    const content = _readFile(filepath);

    fs.writeFileSync(filepath, _bindValues(content, bindMap), { encoding: 'utf-8' });
}

/* Read file */
function _readFile(filepath) {
    if (!fs.existsSync(filepath)) {
        throw new Error(filepath + ' is not exists');
    }

    return fs.readFileSync(filepath, { encoding: 'utf-8' });
}

/* Bind values */
function _bindValues(string, bindMap) {
    const bindPattern = new RegExp(
        Object.keys(bindMap).length === 1 ? Object.keys(bindMap)[0] : Object.keys(bindMap).join('|'),
        'gi'
    );

    return string.replace(bindPattern, (matched) => {
        return bindMap[matched];
    });
}

/* Capitalize */
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
