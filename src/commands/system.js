const chalk = require('chalk');
const inquirer = require('inquirer');
const boxen = require('boxen');
const Config = require('../utils/config');
const Achievements = require('../utils/achievements');

class SystemCommands {
    constructor() {
        this.config = new Config();
        this.achievements = new Achievements();
    }

    dashboard() {
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
    }

    async config() {
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
    }

    achievements() {
        this.achievements.showAll();
    }

    theme(name) {
        const themes = ['default', 'dark', 'light', 'matrix'];

        if (!themes.includes(name)) {
            console.log(chalk.red('❌ Tema no válido'));
            console.log(chalk.gray('Temas disponibles: ') + themes.join(', '));
            return;
        }

        this.config.set('theme', name);
        console.log(chalk.green('✅ Tema cambiado a: ') + chalk.yellow(name));
    }
}

module.exports = new SystemCommands();