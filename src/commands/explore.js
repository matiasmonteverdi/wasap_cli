const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table3');
const { glob } = require('glob');
const ora = require('ora');
const FileHelper = require('../utils/file-helper');
const UIHelper = require('../utils/ui-helper');
const ErrorHandler = require('../utils/error-handler');

class ExploreCommands {
    constructor(config, logger) {
        this.config = config;
        this.logger = logger;
    }

    async list(targetPath = '.', options = {}) {
        const spinner = ora('Escaneando directorio...').start();

        try {
            const fullPath = path.resolve(targetPath);
            const items = await fs.readdir(fullPath, { withFileTypes: true });

            spinner.stop();

            let filtered = items;
            if (options.type) {
                filtered = FileHelper.filterByType(items, options.type, fullPath);
            }

            const table = this.createTable();

            for (const item of filtered) {
                const itemPath = path.join(fullPath, item.name);
                const stats = await fs.stat(itemPath);

                const icon = item.isDirectory() ? '📁' : FileHelper.getFileIcon(item.name);
                const size = item.isDirectory() ? '-' : FileHelper.formatSize(stats.size);
                const modified = stats.mtime.toLocaleDateString('es-ES');

                table.push([
                    icon,
                    item.isDirectory() ? chalk.blue(item.name) : item.name,
                    chalk.gray(size),
                    chalk.gray(modified)
                ]);
            }

            console.log('\n' + chalk.cyan(`📂 ${fullPath}\n`));
            console.log(table.toString());
            console.log(chalk.gray(`\nTotal: ${filtered.length} elementos\n`));

            this.showSuggestions(filtered);
            this.logger.info(`Listado directorio: ${fullPath}`);

        } catch (error) {
            ErrorHandler.handle(error, spinner);
        }
    }

    createTable() {
        return new Table({
            head: [
                chalk.cyan('Tipo'),
                chalk.cyan('Nombre'),
                chalk.cyan('Tamaño'),
                chalk.cyan('Modificado')
            ],
            style: { head: ['cyan'] }
        });
    }

    showSuggestions(items) {
        const txtFiles = items.filter(i => path.extname(i.name) === '.txt');
        const images = items.filter(i =>
            ['.jpg', '.png', '.gif'].includes(path.extname(i.name))
        );

        if (txtFiles.length > 5) {
            UIHelper.showSuggestion(
                'Tienes muchos archivos .txt',
                'wa ls --type document'
            );
        }

        if (images.length > 0) {
            UIHelper.showSuggestion(
                'Hay imágenes en este directorio',
                'wa ls --type picture'
            );
        }
    }

    async tree(targetPath = '.', options = {}) {
        const maxDepth = parseInt(options.depth) || 3;
        const fullPath = path.resolve(targetPath);

        console.log(chalk.cyan('\n🌳 Estructura de árbol:\n'));
        console.log(chalk.blue(fullPath));

        await this.printTree(fullPath, '', 0, maxDepth);
        console.log('');
        this.logger.info(`Árbol mostrado para: ${fullPath}`);
    }

    async printTree(dirPath, prefix, depth, maxDepth) {
        if (depth >= maxDepth) return;

        try {
            const items = await fs.readdir(dirPath, { withFileTypes: true });

            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const isLast = i === items.length - 1;
                const connector = isLast ? '└── ' : '├── ';
                const icon = item.isDirectory() ? '📁' : '📄';

                console.log(prefix + connector + icon + ' ' +
                    (item.isDirectory() ? chalk.blue(item.name) : item.name));

                if (item.isDirectory()) {
                    const newPrefix = prefix + (isLast ? '    ' : '│   ');
                    await this.printTree(
                        path.join(dirPath, item.name),
                        newPrefix,
                        depth + 1,
                        maxDepth
                    );
                }
            }
        } catch (error) {
            // Ignorar errores de permisos
        }
    }

    async find(pattern, options = {}) {
        const spinner = ora('Buscando archivos...').start();

        try {
            const searchPath = path.resolve(options.path || '.');
            const searchPattern = options.extension
                ? `**/*.${options.extension}`
                : `**/*${pattern}*`;

            const files = await glob(searchPattern, {
                cwd: searchPath,
                nodir: true,
                ignore: ['**/node_modules/**', '**/.git/**']
            });

            spinner.stop();

            if (files.length === 0) {
                console.log(chalk.yellow('\n⚠️  No se encontraron archivos\n'));
                return;
            }

            console.log(chalk.cyan(`\n🔍 Resultados: "${pattern}"\n`));

            files.forEach((file, i) => {
                console.log(chalk.gray(`${i + 1}.`) + ' ' + chalk.white(file));
            });

            console.log(chalk.gray(`\nTotal: ${files.length} archivos\n`));
            this.logger.info(`Búsqueda realizada: ${pattern}`);

        } catch (error) {
            ErrorHandler.handle(error, spinner);
        }
    }
}

module.exports = ExploreCommands;
