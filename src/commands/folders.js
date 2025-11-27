const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const Validation = require('../utils/validation');
const ErrorHandler = require('../utils/error-handler');

class FolderCommands {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    async mkdir(targetPath, options = {}) {
        const spinner = ora('Creando carpeta...').start();

        try {
            const fullPath = path.resolve(targetPath);

            await fs.mkdir(fullPath, { recursive: options.parents });
            spinner.succeed(chalk.green('✅ Carpeta creada exitosamente'));
            this.logger.success(`Carpeta creada: ${targetPath}`);

        } catch (error) {
            ErrorHandler.handle(error, spinner);
        }
    }

    async rmdir(targetPath, options = {}) {
        const fullPath = path.resolve(targetPath);

        if (!Validation.directoryExists(fullPath)) {
            console.log(chalk.red('❌ Carpeta no encontrada'));
            return;
        }

        const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: chalk.yellow(`⚠️  ¿Eliminar carpeta "${targetPath}"?`),
            default: false
        }]);

        if (!confirm) {
            console.log(chalk.yellow('⚠️  Operación cancelada'));
            return;
        }

        const spinner = ora('Eliminando carpeta...').start();

        try {
            await fs.rm(fullPath, {
                recursive: options.recursive,
                force: true
            });
            spinner.succeed(chalk.green('✅ Carpeta eliminada'));
            this.logger.success(`Carpeta eliminada: ${targetPath}`);

        } catch (error) {
            ErrorHandler.handle(error, spinner);
        }
    }

    async cd(targetPath) {
        try {
            const fullPath = path.resolve(targetPath);

            if (!Validation.directoryExists(fullPath)) {
                console.log(chalk.red('❌ Directorio no encontrado'));
                return;
            }

            process.chdir(fullPath);
            console.log(chalk.green('✅ Directorio cambiado a: ') + chalk.cyan(fullPath));
            this.logger.info(`Directorio cambiado a: ${fullPath}`);

        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}

module.exports = FolderCommands;