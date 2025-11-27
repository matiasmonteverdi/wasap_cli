const { program } = require('commander');
const chalk = require('chalk');
const UIHelper = require('./src/utils/ui-helper');
const Config = require('./src/utils/config');
const Logger = require('./src/utils/logger');
const Achievements = require('./src/utils/achievements');

// Importar clases de comandos
const FileCommands = require('./src/commands/files');
const FolderCommands = require('./src/commands/folders');
const ExploreCommands = require('./src/commands/explore');
const FavoritesCommands = require('./src/commands/favorites');
const HistoryCommands = require('./src/commands/history');
const AssistantCommands = require('./src/commands/assistant');
const SystemCommands = require('./src/commands/system');
const EasterEggs = require('./src/commands/eastereggs');

const WINASSIST_BANNER = `
██╗    ██╗ █████╗ ███████╗ █████╗ ██████╗      ██████╗██╗     ██╗
██║    ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗    ██╔════╝██║     ██║
██║ █╗ ██║███████║███████╗███████║██████╔╝    ██║     ██║     ██║
██║███╗██║██╔══██║╚════██║██╔══██║██╔═══╝     ██║     ██║     ██║
╚███╔███╔╝██║  ██║███████║██║  ██║██║         ╚██████╗███████╗██║
 ╚══╝╚══╝ ╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝          ╚═════╝╚══════╝╚═╝
                                                                 
`;

class WinAssist {
    constructor() {
        this.config = new Config();
        this.logger = new Logger();
        this.achievements = new Achievements();
        this.version = '1.0.0';

        // Inyección de Dependencias
        this.fileCommands = new FileCommands(this.config, this.logger);
        this.folderCommands = new FolderCommands(this.config, this.logger);
        this.exploreCommands = new ExploreCommands(this.config, this.logger);
        this.favoritesCommands = new FavoritesCommands(this.config, this.logger);
        this.historyCommands = new HistoryCommands(this.config, this.logger);
        this.assistantCommands = new AssistantCommands(this.config, this.logger);
        this.systemCommands = new SystemCommands(this.config, this.logger);
        this.easterEggs = EasterEggs; // Instancia estática
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
            .action(this.exploreCommands.list.bind(this.exploreCommands));

        program
            .command('tree [path]')
            .description('Muestra estructura en árbol')
            .option('-d, --depth <depth>', 'Profundidad máxima', '3')
            .action(this.exploreCommands.tree.bind(this.exploreCommands));

        program
            .command('find <pattern>')
            .description('Busca archivos')
            .option('-p, --path <path>', 'Ruta de búsqueda', '.')
            .option('-e, --extension <ext>', 'Filtrar por extensión')
            .action(this.exploreCommands.find.bind(this.exploreCommands));

        // Archivos
        program
            .command('open <file>')
            .description('Abre archivo')
            .action(this.fileCommands.open.bind(this.fileCommands));

        program
            .command('read <file>')
            .description('Lee archivo')
            .option('-l, --lines <number>', 'Número de líneas')
            .action(this.fileCommands.read.bind(this.fileCommands));

        program
            .command('copy <source> <destination>')
            .description('Copia archivos')
            .option('-f, --force', 'Sobrescribir')
            .action(this.fileCommands.copy.bind(this.fileCommands));

        program
            .command('move <source> <destination>')
            .description('Mueve archivos')
            .action(this.fileCommands.move.bind(this.fileCommands));

        program
            .command('delete <file>')
            .description('Elimina archivos')
            .option('-y, --yes', 'Confirmar automáticamente')
            .action(this.fileCommands.delete.bind(this.fileCommands));

        // Carpetas
        program
            .command('mkdir <name>')
            .description('Crea carpeta')
            .option('-p, --parents', 'Crear padres')
            .action(this.folderCommands.mkdir.bind(this.folderCommands));

        program
            .command('rmdir <name>')
            .description('Elimina carpeta')
            .option('-r, --recursive', 'Recursivo')
            .action(this.folderCommands.rmdir.bind(this.folderCommands));

        program
            .command('cd <path>')
            .description('Cambia directorio')
            .action(this.folderCommands.cd.bind(this.folderCommands));

        // Favoritos
        program
            .command('fav')
            .description('Lista favoritos')
            .action(this.favoritesCommands.list.bind(this.favoritesCommands));

        program
            .command('fav-add <path>')
            .description('Agrega favorito')
            .option('-n, --name <name>', 'Nombre')
            .action(this.favoritesCommands.add.bind(this.favoritesCommands));

        program
            .command('fav-remove <name>')
            .description('Elimina favorito')
            .action(this.favoritesCommands.remove.bind(this.favoritesCommands));

        program
            .command('fav-go <name>')
            .description('Ir a favorito')
            .action(this.favoritesCommands.go.bind(this.favoritesCommands));

        // Historial
        program
            .command('history')
            .description('Muestra historial')
            .option('-n, --number <number>', 'Cantidad', '20')
            .action(this.historyCommands.show.bind(this.historyCommands));

        program
            .command('history-clear')
            .description('Limpia historial')
            .action(this.historyCommands.clear.bind(this.historyCommands));

        // Asistente
        program
            .command('ask <question>')
            .description('Pregunta al asistente')
            .action(this.assistantCommands.ask.bind(this.assistantCommands));

        program
            .command('suggest')
            .description('Obtiene sugerencias')
            .action(this.assistantCommands.suggest.bind(this.assistantCommands));

        // Sistema
        program
            .command('dashboard')
            .description('Dashboard del sistema')
            .action(this.systemCommands.dashboard.bind(this.systemCommands));

        program
            .command('config')
            .description('Configuración')
            .action(this.systemCommands.config.bind(this.systemCommands));

        program
            .command('achievements')
            .description('Muestra logros')
            .action(this.systemCommands.achievements.bind(this.systemCommands));

        program
            .command('theme <name>')
            .description('Cambia tema')
            .action(this.systemCommands.theme.bind(this.systemCommands));

        // Easter Eggs
        program
            .command('matrix')
            .description('???')
            .action(this.easterEggs.matrix.bind(this.easterEggs));

        program
            .command('hack')
            .description('???')
            .action(this.easterEggs.hack.bind(this.easterEggs));

        program
            .command('wisdom')
            .description('???')
            .action(this.easterEggs.wisdom.bind(this.easterEggs));
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