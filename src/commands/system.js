const chalk = require('chalk');
const inquirer = require('inquirer');
const boxen = require('boxen');
const Achievements = require('../utils/achievements');
const ErrorHandler = require('../utils/error-handler');

class SystemCommands {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
        this.achievements = new Achievements(); // Singleton, but could also be injected
    }

    dashboard() {
        try {
            const stats = this.config.get('stats');

            console.clear();
            console.log(chalk.cyan('\n📊 Dashboard del Sistema\n'));

            const info = boxen(
                chalk.white('Comandos ejecutados: ') + chalk.yellow(stats.commandsRun) + '\n' +
                chalk.white('Archivos abiertos: ') + chalk.yellow(stats.filesOpened) + '\n' +
                chalk.white('Carpetas creadas: ') + chalk.yellow(stats.foldersCreated),
                {
                    padding: 1,
                    margin: 1,
                    borderStyle: 'round',
                    borderColor: 'cyan'
                }
            );

            console.log(info);
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    async config() {
        try {
            const currentTheme = this.config.get('theme');
            const currentLang = this.config.get('language');

            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'theme',
                    message: 'Tema de colores:',
                    choices: ['default', 'dark', 'light', 'matrix'],
                    default: currentTheme
                },
                {
                    type: 'list',
                    name: 'language',
                    message: 'Idioma:',
                    choices: ['es', 'en'],
                    default: currentLang
                }
            ]);

            this.config.set('theme', answers.theme);
            this.config.set('language', answers.language);

            console.log(chalk.green('\n✅ Configuración guardada\n'));
            this.logger.success('Configuración actualizada');

        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    achievements() {
        try {
            this.achievements.showAll();
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }

    theme(name) {
        try {
            const themes = ['default', 'dark', 'light', 'matrix'];

            if (!themes.includes(name)) {
                console.log(chalk.red('❌ Tema no válido'));
                console.log(chalk.gray('Temas disponibles: ') + themes.join(', '));
                return;
            }

            this.config.set('theme', name);
            console.log(chalk.green('✅ Tema cambiado a: ') + chalk.yellow(name));
            this.logger.success(`Tema cambiado a: ${name}`);

        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}

module.exports = SystemCommands;