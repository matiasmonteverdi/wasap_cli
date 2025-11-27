const chalk = require('chalk');
const inquirer = require('inquirer');
const path = require('path');
const Config = require('../utils/config');
const Validation = require('../utils/validation');
const UIHelper = require('../utils/ui-helper');

class FavoritesCommands {
    constructor() {
        this.config = new Config();
    }

    list() {
        const favorites = this.config.get('favorites');

        if (favorites.length === 0) {
            console.log(chalk.yellow('\n⚠️  No hay favoritos guardados\n'));
            console.log(chalk.gray('Usa: ') + chalk.green('wa fav-add '));
            return;
        }

        console.log(chalk.cyan('\n⭐ Favoritos:\n'));

        favorites.forEach((fav, i) => {
            console.log(
                chalk.gray(`${i + 1}.`) + ' ' +
                chalk.yellow(fav.name) + ' ' +
                chalk.gray('→') + ' ' +
                chalk.white(fav.path)
            );
        });

        console.log('');
    }

    async add(targetPath, options) {
        const fullPath = path.resolve(targetPath);

        if (!Validation.pathExists(fullPath)) {
            console.log(chalk.red('❌ La ruta no existe'));
            return;
        }

        const name = options.name || path.basename(fullPath);
        const favorites = this.config.get('favorites');

        // Verificar si ya existe
        if (favorites.some(f => f.path === fullPath)) {
            console.log(chalk.yellow('⚠️  Esta ruta ya está en favoritos'));
            return;
        }

        favorites.push({ name, path: fullPath });
        this.config.set('favorites', favorites);

        console.log(chalk.green('✅ Favorito agregado: ') + chalk.yellow(name));
    }

    remove(name) {
        let favorites = this.config.get('favorites');
        const initial = favorites.length;

        favorites = favorites.filter(f => f.name !== name);

        if (favorites.length === initial) {
            console.log(chalk.red('❌ Favorito no encontrado'));
            return;
        }

        this.config.set('favorites', favorites);
        console.log(chalk.green('✅ Favorito eliminado'));
    }

    go(name) {
        const favorites = this.config.get('favorites');
        const favorite = favorites.find(f => f.name === name);

        if (!favorite) {
            console.log(chalk.red('❌ Favorito no encontrado'));
            return;
        }

        try {
            process.chdir(favorite.path);
            console.log(chalk.green('✅ Navegando a: ') + chalk.cyan(favorite.path));
        } catch (error) {
            console.log(chalk.red(`Error: ${error.message}`));
        }
    }
}

module.exports = new FavoritesCommands();
