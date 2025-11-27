const FileHelper = require('../utils/file-helper');
const UIHelper = require('../utils/ui-helper');
const Validation = require('../utils/validation');
const Logger = require('../utils/logger');
const inquirer = require('inquirer');
const chalk = require('chalk');
const ora = require('ora');
const open = require('open');

const logger = new Logger();

class FileCommands {
    async open(file) {
        const spinner = ora('Abriendo archivo...').start();

        try {
            const fullPath = Validation.resolvePath(file);

            if (!Validation.fileExists(fullPath)) {
                spinner.fail(chalk.red('❌ Archivo no encontrado'));
                return;
            }

            await open(fullPath);
            spinner.succeed(chalk.green('✅ Archivo abierto'));
            logger.success(`Archivo abierto: ${file}`);

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }

    async read(file, options = {}) {
        const spinner = ora('Leyendo archivo...').start();

        try {
            const fullPath = Validation.resolvePath(file);
            const content = await FileHelper.readFile(fullPath);

            spinner.stop();
            UIHelper.displayFileContent(file, content, options.lines);

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }

    async copy(source, destination, options = {}) {
        const spinner = ora('Copiando archivo...').start();

        try {
            const srcPath = Validation.resolvePath(source);
            const dstPath = Validation.resolvePath(destination);

            if (!Validation.fileExists(srcPath)) {
                spinner.fail(chalk.red('❌ Archivo origen no encontrado'));
                return;
            }

            if (Validation.fileExists(dstPath) && !options.force) {
                spinner.stop();
                const shouldOverwrite = await UIHelper.confirmOverwrite();

                if (!shouldOverwrite) {
                    console.log(chalk.yellow('⚠️  Operación cancelada'));
                    return;
                }
                spinner.start();
            }

            await FileHelper.copyFile(srcPath, dstPath);
            spinner.succeed(chalk.green('✅ Archivo copiado exitosamente'));

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }

    async move(source, destination) {
        const spinner = ora('Moviendo archivo...').start();

        try {
            const srcPath = Validation.resolvePath(source);
            const dstPath = Validation.resolvePath(destination);

            await FileHelper.moveFile(srcPath, dstPath);
            spinner.succeed(chalk.green('✅ Archivo movido exitosamente'));

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }

    async delete(file, options = {}) {
        const fullPath = Validation.resolvePath(file);

        if (!Validation.fileExists(fullPath)) {
            console.log(chalk.red('❌ Archivo no encontrado'));
            return;
        }

        if (!options.yes) {
            const shouldDelete = await UIHelper.confirmDelete(file);
            if (!shouldDelete) {
                console.log(chalk.yellow('⚠️  Operación cancelada'));
                return;
            }
        }

        const spinner = ora('Eliminando archivo...').start();

        try {
            await FileHelper.deleteFile(fullPath);
            spinner.succeed(chalk.green('✅ Archivo eliminado'));
        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }
}

module.exports = new FileCommands();