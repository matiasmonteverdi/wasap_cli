const chalk = require('chalk');
const ora = require('ora');
const NLP = require('../utils/nlp');

class AssistantCommands {
    constructor() {
        this.nlp = new NLP();
    }

    async ask(question) {
        const spinner = ora('Pensando...').start();

        try {
            // Simular procesamiento NLP
            await new Promise(resolve => setTimeout(resolve, 1000));

            const response = this.nlp.process(question);

            spinner.stop();

            console.log('\n' + chalk.cyan('🤖 Asistente:\n'));
            console.log(chalk.white(response));
            console.log('');

        } catch (error) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        }
    }

    suggest() {
        const suggestions = [
            'wa ls --type picture - Para ver solo imágenes',
            'wa tree - Para ver la estructura de carpetas',
            'wa fav-add . - Para guardar esta ubicación',
            'wa find "*.txt" - Para buscar archivos de texto'
        ];

        console.log('\n' + chalk.cyan('💡 Sugerencias:\n'));

        suggestions.forEach((suggestion, i) => {
            console.log(chalk.gray(`${i + 1}.`) + ' ' + chalk.white(suggestion));
        });

        console.log('');
    }
}

module.exports = new AssistantCommands();