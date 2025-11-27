const Conf = require('conf');

class Config {
    constructor() {
        // Singleton pattern - return existing instance if it exists
        if (Config.instance) {
            return Config.instance;
        }

        this.config = new Conf({
            projectName: 'winassist',
            defaults: {
                language: 'es',
                theme: 'default',
                favorites: [],
                history: [],
                achievements: [],
                stats: {
                    commandsRun: 0,
                    filesOpened: 0,
                    foldersCreated: 0,
                    filesDeleted: 0,
                    searchesMade: 0
                },
                settings: {
                    confirmDelete: true,
                    showSuggestions: true,
                    colorOutput: true
                }
            }
        });

        Config.instance = this;
    }

    get(key) {
        return this.config.get(key);
    }

    set(key, value) {
        this.config.set(key, value);
    }

    has(key) {
        return this.config.has(key);
    }

    delete(key) {
        this.config.delete(key);
    }

    clear() {
        this.config.clear();
    }

    addToHistory(command) {
        const history = this.get('history');
        history.unshift({
            command,
            timestamp: new Date().toISOString()
        });

        if (history.length > 100) {
            history.pop();
        }

        this.set('history', history);
    }

    incrementStat(stat) {
        const stats = this.get('stats');
        stats[stat] = (stats[stat] || 0) + 1;
        this.set('stats', stats);
    }

    getStats() {
        return this.get('stats');
    }

    resetStats() {
        this.set('stats', {
            commandsRun: 0,
            filesOpened: 0,
            foldersCreated: 0,
            filesDeleted: 0,
            searchesMade: 0
        });
    }
}

module.exports = Config;