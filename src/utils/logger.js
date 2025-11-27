const chalk = require('chalk');
const Config = require('./config');

class Logger {
    constructor() {
        // Singleton pattern - return existing instance if it exists
        if (Logger.instance) {
            return Logger.instance;
        }

        this.config = new Config();
        Logger.instance = this;
    }

    logCommand(command) {
        this.config.addToHistory(command);
        this.config.incrementStat('commandsRun');
    }

    success(message) {
        console.log(chalk.green('✅ ') + message);
    }

    error(message) {
        console.log(chalk.red('❌ ') + message);
    }

    warning(message) {
        console.log(chalk.yellow('⚠️  ') + message);
    }

    info(message) {
        console.log(chalk.cyan('ℹ️  ') + message);
    }

    debug(message) {
        if (process.env.DEBUG) {
            console.log(chalk.gray('🐛 ') + message);
        }
    }

    log(message) {
        console.log(message);
    }
}

module.exports = Logger;