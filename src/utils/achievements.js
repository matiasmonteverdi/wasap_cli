const chalk = require('chalk');
const boxen = require('boxen');
const Config = require('./config');

class Achievements {
    constructor() {
        // Singleton pattern - return existing instance if it exists
        if (Achievements.instance) {
            return Achievements.instance;
        }

        this.config = new Config();
        this.definitions = [
            {
                id: 'first_command',
                name: '🎯 Primer Paso',
                description: 'Ejecuta tu primer comando',
                condition: (stats) => stats.commandsRun >= 1
            },
            {
                id: 'explorer',
                name: '🗺️ Explorador',
                description: 'Usa comandos 10 veces',
                condition: (stats) => stats.commandsRun >= 10
            },
            {
                id: 'file_master',
                name: '📂 Maestro de Archivos',
                description: 'Abre 50 archivos',
                condition: (stats) => stats.filesOpened >= 50
            },
            {
                id: 'organizer',
                name: '🏗️ Organizador',
                description: 'Crea 20 carpetas',
                condition: (stats) => stats.foldersCreated >= 20
            },
            {
                id: 'power_user',
                name: '⚡ Usuario Avanzado',
                description: 'Ejecuta 100 comandos',
                condition: (stats) => stats.commandsRun >= 100
            },
            {
                id: 'searcher',
                name: '🔍 Buscador Experto',
                description: 'Realiza 25 búsquedas',
                condition: (stats) => stats.searchesMade >= 25
            },
            {
                id: 'cleaner',
                name: '🧹 Limpiador',
                description: 'Elimina 30 archivos',
                condition: (stats) => stats.filesDeleted >= 30
            }
        ];

        Achievements.instance = this;
    }

    check(command) {
        const stats = this.config.getStats();
        const unlocked = this.config.get('achievements');

        this.definitions.forEach(achievement => {
            if (!unlocked.includes(achievement.id) && achievement.condition(stats)) {
                this.unlock(achievement);
                unlocked.push(achievement.id);
            }
        });

        this.config.set('achievements', unlocked);
    }

    unlock(achievement) {
        const message = boxen(
            chalk.yellow('🏆 ¡LOGRO DESBLOQUEADO!\n\n') +
            chalk.white(achievement.name + '\n') +
            chalk.gray(achievement.description),
            {
                padding: 1,
                margin: 1,
                borderStyle: 'double',
                borderColor: 'yellow'
            }
        );

        console.log('\n' + message);
    }

    getRecent(limit = 3) {
        const unlocked = this.config.get('achievements');
        const recentIds = unlocked.slice(-limit).reverse();

        return recentIds.map(id =>
            this.definitions.find(def => def.id === id)
        ).filter(Boolean);
    }

    showAll() {
        const unlocked = this.config.get('achievements');

        console.log(chalk.cyan('\n🏆 Tus Logros:\n'));

        this.definitions.forEach(achievement => {
            const isUnlocked = unlocked.includes(achievement.id);
            const icon = isUnlocked ? '✅' : '🔒';
            const color = isUnlocked ? chalk.green : chalk.gray;

            console.log(
                icon + ' ' +
                color(achievement.name) + '\n' +
                chalk.gray('   ' + achievement.description) + '\n'
            );
        });

        const percentage = Math.round((unlocked.length / this.definitions.length) * 100);
        console.log(chalk.yellow(`Completado: ${percentage}%\n`));
    }
}

module.exports = Achievements;