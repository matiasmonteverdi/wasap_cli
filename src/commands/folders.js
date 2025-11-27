const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const Validation = require('../utils/validation');

class FolderCommands {
    async mkdir(targetPath, options) {
        const spinner = ora('Creando carpeta...').start();

        try {
            const fullPath = path.resolve(targetPath);

            await fs.mkdir(fullPath, { recursive: options.parents });
            spinner.succeed(chalk.green('✅ Carpeta creada exitosamente'));

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }

    async rmdir(targetPath, options) {
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

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
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

        } catch (error) {
            console.log(chalk.red(`Error: ${error.message}`));
        }
    }
}

module.exports = new FolderCommands();