const chalk = require('chalk');
const Table = require('cli-table3');
const inquirer = require('inquirer');
const ErrorHandler = require('../utils/error-handler');

class HistoryCommands {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    show(options = {}) {
        try {
            const history = this.config.get('history');
            const count = parseInt(options.number) || 20;
            const recent = history.slice(0, count);

            if (recent.length === 0) {
                console.log(chalk.yellow('\n⚠️  No hay historial\n'));
                return;
            }

            const table = new Table({
                head: [
                    chalk.cyan('#'),
                    chalk.cyan('Comando'),
                    chalk.cyan('Fecha')
                ]
            });

            recent.forEach((entry, i) => {
                const date = new Date(entry.timestamp);
                table.push([
                    chalk.gray(i + 1),
                    chalk.white(entry.command),
                    chalk.gray(date.toLocaleString('es-ES'))
                ]);
            });

            console.log('\n' + chalk.cyan('📜 Historial de Comandos\n'));
            console.log(table.toString());
            console.log('');
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    async clear() {
        try {
            const { confirm } = await inquirer.prompt([{
                type: 'confirm',
                name: 'confirm',
                message: '¿Limpiar todo el historial?',
                default: false
            }]);

            if (confirm) {
                this.config.set('history', []);
                console.log(chalk.green('✅ Historial limpiado'));
                this.logger.success('Historial limpiado');
            } else {
                console.log(chalk.yellow('⚠️  Operación cancelada'));
            }
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}

module.exports = HistoryCommands;
