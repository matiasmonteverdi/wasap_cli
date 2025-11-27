const chalk = require('chalk');
const ora = require('ora');
const NLP = require('../utils/nlp');
const ErrorHandler = require('../utils/error-handler');

class AssistantCommands {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
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
            this.logger.info(`Pregunta al asistente: ${question}`);

        } catch (error) {
            ErrorHandler.handle(error, spinner);
        }
    }

    suggest() {
        try {
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
        } catch (error) {
            ErrorHandler.handle(error);
        }
    }
}

module.exports = AssistantCommands;