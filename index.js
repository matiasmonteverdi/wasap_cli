const { program } = require('commander');
const chalk = require('chalk');
const UIHelper = require('./src/utils/ui-helper');
const Config = require('./src/utils/config');
const Logger = require('./src/utils/logger');
const Achievements = require('./src/utils/achievements');

// Importar comandos
const FileCommands = require('./src/commands/files');
const FolderCommands = require('./src/commands/folders');
const ExploreCommands = require('./src/commands/explore');
const FavoritesCommands = require('./src/commands/favorites');
const HistoryCommands = require('./src/commands/history');
const AssistantCommands = require('./src/commands/assistant');
const SystemCommands = require('./src/commands/system');
const EasterEggs = require('./src/commands/eastereggs');

const WINASSIST_BANNER = `
W_W_A_A_S_S_I_S_T
\\\\ \\\\/ / | |/ _\` |
 \\\\  /| | | (_| |
  \\\\/ |_|_|\\\\__,_|

  _ __ ___   __ _ _ __ ___  
 | '_ \` _ \\\\ / _\` | '_ \` _ \\\\ 
 | | | | | | (_| | | | | | |
 |_| |_| |_|\\\\__,_|_| |_| |_|
`;

class WinAssist {
    constructor() {
        this.config = new Config();
        this.logger = new Logger();
        this.achievements = new Achievements();
        this.version = '1.0.0';
    }

    showWelcome() {
        UIHelper.showWelcomeBanner(WINASSIST_BANNER, this.version);

        const recentAchievements = this.achievements.getRecent();
        if (recentAchievements.length > 0) {
            UIHelper.showRecentAchievements(recentAchievements);
        }
    }

    setupCommands() {
        program
            .name('wa')
            .description('WinAssist - Asistente inteligente para Windows')
            .version(this.version);

        // Exploración
        program
            .command('ls [path]')
            .description('Lista archivos y carpetas')
            .option('-t, --type <type>', 'Filtrar por tipo')
            .option('-s, --sort <field>', 'Ordenar por campo')
            .option('-r, --reverse', 'Orden inverso')
            .action(ExploreCommands.list);

        program
            .command('tree [path]')
            .description('Muestra estructura en árbol')
            .option('-d, --depth <depth>', 'Profundidad máxima', '3')
            .action(ExploreCommands.tree);

        program
            .command('find <pattern>')
            .description('Busca archivos')
            .option('-p, --path <path>', 'Ruta de búsqueda', '.')
            .option('-e, --extension <ext>', 'Filtrar por extensión')
            .action(ExploreCommands.find);

        // Archivos
        program
            .command('open <file>')
            .description('Abre archivo')
            .action(FileCommands.open);

        program
            .command('read <file>')
            .description('Lee archivo')
            .option('-l, --lines <number>', 'Número de líneas')
            .action(FileCommands.read);

        program
            .command('copy <source> <destination>')
            .description('Copia archivos')
            .option('-f, --force', 'Sobrescribir')
            .action(FileCommands.copy);

        program
            .command('move <source> <destination>')
            .description('Mueve archivos')
            .action(FileCommands.move);

        program
            .command('delete <file>')
            .description('Elimina archivos')
            .option('-y, --yes', 'Confirmar automáticamente')
            .action(FileCommands.delete);

        // Carpetas
        program
            .command('mkdir <name>')
            .description('Crea carpeta')
            .option('-p, --parents', 'Crear padres')
            .action(FolderCommands.mkdir);

        program
            .command('rmdir <name>')
            .description('Elimina carpeta')
            .option('-r, --recursive', 'Recursivo')
            .action(FolderCommands.rmdir);

        program
            .command('cd <path>')
            .description('Cambia directorio')
            .action(FolderCommands.cd);

        // Favoritos
        program
            .command('fav')
            .description('Lista favoritos')
            .action(FavoritesCommands.list);

        program
            .command('fav-add <path>')
            .description('Agrega favorito')
            .option('-n, --name <name>', 'Nombre')
            .action(FavoritesCommands.add);

        program
            .command('fav-remove <name>')
            .description('Elimina favorito')
            .action(FavoritesCommands.remove);

        program
            .command('fav-go <name>')
            .description('Ir a favorito')
            .action(FavoritesCommands.go);

        // Historial
        program
            .command('history')
            .description('Muestra historial')
            .option('-n, --number <number>', 'Cantidad', '20')
            .action(HistoryCommands.show);

        program
            .command('history-clear')
            .description('Limpia historial')
            .action(HistoryCommands.clear);

        // Asistente
        program
            .command('ask <question>')
            .description('Pregunta al asistente')
            .action(AssistantCommands.ask);

        program
            .command('suggest')
            .description('Obtiene sugerencias')
            .action(AssistantCommands.suggest);

        // Sistema
        program
            .command('dashboard')
            .description('Dashboard del sistema')
            .action(SystemCommands.dashboard);

        program
            .command('config')
            .description('Configuración')
            .action(SystemCommands.config);

        program
            .command('achievements')
            .description('Muestra logros')
            .action(SystemCommands.achievements);

        program
            .command('theme <name>')
            .description('Cambia tema')
            .action(SystemCommands.theme);

        // Easter Eggs
        program
            .command('matrix')
            .description('???')
            .action(EasterEggs.matrix);

        program
            .command('hack')
            .description('???')
            .action(EasterEggs.hack);

        program
            .command('wisdom')
            .description('???')
            .action(EasterEggs.wisdom);
    }

    init() {
        if (process.argv.length === 2) {
            this.showWelcome();
            return;
        }

        this.setupCommands();

        const command = process.argv.slice(2).join(' ');
        this.logger.logCommand(command);
        this.achievements.check(command);

        program.parse(process.argv);
    }
}

module.exports = new WinAssist();