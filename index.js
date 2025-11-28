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
            .action((...args) => this.exploreCommands.list(...args));

        program
            .command('tree [path]')
            .description('Muestra estructura en árbol')
            .option('-d, --depth <depth>', 'Profundidad máxima', '3')
            .action((...args) => this.exploreCommands.tree(...args));

        program
            .command('find <pattern>')
            .description('Busca archivos')
            .option('-p, --path <path>', 'Ruta de búsqueda', '.')
            .option('-e, --extension <ext>', 'Filtrar por extensión')
            .action((...args) => this.exploreCommands.find(...args));

        // Archivos
        program
            .command('open <file>')
            .description('Abre archivo')
            .action((...args) => this.fileCommands.open(...args));

        program
            .command('read <file>')
            .description('Lee archivo')
            .option('-l, --lines <number>', 'Número de líneas')
            .action((...args) => this.fileCommands.read(...args));

        program
            .command('copy <source> <destination>')
            .description('Copia archivos')
            .option('-f, --force', 'Sobrescribir')
            .action((...args) => this.fileCommands.copy(...args));

        program
            .command('move <source> <destination>')
            .description('Mueve archivos')
            .action((...args) => this.fileCommands.move(...args));

        program
            .command('delete <file>')
            .description('Elimina archivos')
            .option('-y, --yes', 'Confirmar automáticamente')
            .action((...args) => this.fileCommands.delete(...args));

        // Carpetas
        program
            .command('mkdir <name>')
            .description('Crea carpeta')
            .option('-p, --parents', 'Crear padres')
            .action((...args) => this.folderCommands.mkdir(...args));

        program
            .command('rmdir <name>')
            .description('Elimina carpeta')
            .option('-r, --recursive', 'Recursivo')
            .action((...args) => this.folderCommands.rmdir(...args));

        program
            .command('cd <path>')
            .description('Cambia directorio')
            .action((...args) => this.folderCommands.cd(...args));

        // Favoritos
        program
            .command('fav')
            .description('Lista favoritos')
            .action((...args) => this.favoritesCommands.list(...args));

        program
            .command('fav-add <path>')
            .description('Agrega favorito')
            .option('-n, --name <name>', 'Nombre')
            .action((...args) => this.favoritesCommands.add(...args));

        program
            .command('fav-remove <name>')
            .description('Elimina favorito')
            .action((...args) => this.favoritesCommands.remove(...args));

        program
            .command('fav-go <name>')
            .description('Ir a favorito')
            .action((...args) => this.favoritesCommands.go(...args));

        // Historial
        program
            .command('history')
            .description('Muestra historial')
            .option('-n, --number <number>', 'Cantidad', '20')
            .action((...args) => this.historyCommands.show(...args));

        program
            .command('history-clear')
            .description('Limpia historial')
            .action((...args) => this.historyCommands.clear(...args));

        // Asistente
        program
            .command('ask <question>')
            .description('Pregunta al asistente')
            .action((...args) => this.assistantCommands.ask(...args));

        program
            .command('suggest')
            .description('Obtiene sugerencias')
            .action((...args) => this.assistantCommands.suggest(...args));

        // Sistema
        program
            .command('dashboard')
            .description('Dashboard del sistema')
            .action((...args) => this.systemCommands.dashboard(...args));

        program
            .command('config')
            .description('Configuración')
            .action((...args) => this.systemCommands.config(...args));

        program
            .command('achievements')
            .description('Muestra logros')
            .action((...args) => this.systemCommands.achievements(...args));

        program
            .command('theme <name>')
            .description('Cambia tema')
            .action((...args) => this.systemCommands.theme(...args));

        // Easter Eggs
        program
            .command('matrix')
            .description('???')
            .action((...args) => this.easterEggs.matrix(...args));

        program
            .command('hack')
            .description('???')
            .action((...args) => this.easterEggs.hack(...args));

        program
            .command('wisdom')
            .description('???')
            .action((...args) => this.easterEggs.wisdom(...args));
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