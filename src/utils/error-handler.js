const chalk = require('chalk');

class ErrorHandler {
    static handle(error, spinner = null) {
        if (spinner) {
            spinner.fail(chalk.red(`Error: ${error.message}`));
        } else {
            console.log(chalk.red(`❌ Error: ${error.message}`));
        }

        if (process.env.DEBUG) {
            console.error(chalk.gray(error.stack));
        }
    }
}

module.exports = ErrorHandler;
