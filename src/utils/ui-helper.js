const chalk = require('chalk');
const figlet = require('figlet');
const gradient = require('gradient-string');
const boxen = require('boxen');
const inquirer = require('inquirer');

class UIHelper {
    static showWelcomeBanner(banner, version) {
        console.clear();

        // Use custom banner if provided, otherwise generate with figlet
        if (banner) {
            console.log(gradient.pastel.multiline(banner));
        } else {
            const title = figlet.textSync('WinAssist', {
                font: 'ANSI Shadow',
                horizontalLayout: 'default'
            });
            console.log(gradient.pastel.multiline(title));
        }

        const welcomeBox = boxen(
            chalk.cyan('🚀 Asistente Inteligente de Windows\n') +
            chalk.gray('Versión ') + chalk.yellow(version) + '\n\n' +
            chalk.white('Escribe ') + chalk.green('wa help') +
            chalk.white(' para ver todos los comandos\n') +
            chalk.white('Escribe ') + chalk.green('wa ask "qué puedes hacer"') +
            chalk.white(' para modo asistente'),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'round',
                borderColor: 'cyan',
                backgroundColor: '#1a1a1a'
            }
        );

        console.log(welcomeBox);
    }

    static showRecentAchievements(achievements) {
        console.log(chalk.yellow('🏆 Logros recientes:'));
        achievements.forEach(ach => {
            console.log(chalk.gray('  • ') + ach.name);
        });
        console.log('');
    }

    static displayFileContent(filename, content, maxLines) {
        console.log(chalk.cyan('\n📄 Contenido de: ') + chalk.yellow(filename));
        console.log(chalk.gray('─'.repeat(60)));

        const lines = content.split('\n');
        const displayLines = maxLines ? lines.slice(0, parseInt(maxLines)) : lines;

        displayLines.forEach((line, i) => {
            console.log(chalk.gray(`${i + 1}:`.padStart(5)) + ' ' + line);
        });

        if (maxLines && lines.length > parseInt(maxLines)) {
            console.log(chalk.gray(`\n... ${lines.length - parseInt(maxLines)} líneas más`));
        }

        console.log(chalk.gray('─'.repeat(60) + '\n'));
    }

    static async confirmOverwrite() {
        const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: 'El archivo destino existe. ¿Sobrescribir?',
            default: false
        }]);
        return confirm;
    }

    static async confirmDelete(filename) {
        const { confirm } = await inquirer.prompt([{
            type: 'confirm',
            name: 'confirm',
            message: chalk.yellow(`⚠️  ¿Estás seguro de eliminar "${filename}"?`),
            default: false
        }]);
        return confirm;
    }

    static showSuggestion(message, command) {
        console.log(
            chalk.yellow('💡 Sugerencia: ') +
            chalk.white(message + '. Prueba: ') +
            chalk.green(command)
        );
    }

    static showError(message) {
        console.log(chalk.red('❌ Error: ') + message);
    }

    static showSuccess(message) {
        console.log(chalk.green('✅ ') + message);
    }

    static showWarning(message) {
        console.log(chalk.yellow('⚠️  ') + message);
    }

    static showInfo(message) {
        console.log(chalk.cyan('ℹ️  ') + message);
    }
}

module.exports = UIHelper;
