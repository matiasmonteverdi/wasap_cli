const chalk = require('chalk');

class NLP {
    constructor() {
        this.commands = {
            list: ['listar', 'mostrar', 'ver', 'archivos', 'carpetas'],
            open: ['abrir', 'ejecutar', 'lanzar'],
            find: ['buscar', 'encontrar', 'localizar'],
            delete: ['eliminar', 'borrar', 'quitar'],
            copy: ['copiar', 'duplicar'],
            move: ['mover', 'transferir'],
            help: ['ayuda', 'ayúdame', 'qué puedes hacer']
        };
    }

    process(question) {
        const lower = question.toLowerCase();

        // Detectar intención
        if (this.matchesKeywords(lower, this.commands.help)) {
            return this.getHelpResponse();
        }

        if (this.matchesKeywords(lower, this.commands.list)) {
            return 'Puedo listar archivos con: wa ls\nO filtrar por tipo: wa ls --type picture';
        }

        if (this.matchesKeywords(lower, this.commands.find)) {
            return 'Para buscar archivos usa: wa find "nombre"\nPor ejemplo: wa find "*.txt"';
        }

        if (this.matchesKeywords(lower, this.commands.open)) {
            return 'Para abrir un archivo: wa open archivo.txt\nSe abrirá con la aplicación predeterminada.';
        }

        if (this.matchesKeywords(lower, this.commands.delete)) {
            return 'Para eliminar archivos: wa delete archivo.txt\nPara carpetas: wa rmdir carpeta';
        }

        // Respuesta genérica
        return 'No estoy seguro de cómo ayudarte con eso. Intenta: wa help para ver todos los comandos disponibles.';
    }

    matchesKeywords(text, keywords) {
        return keywords.some(keyword => text.includes(keyword));
    }

    getHelpResponse() {
        return `Puedo ayudarte con estas tareas:

📂 Exploración:
  • wa ls - Listar archivos
  • wa tree - Ver estructura de carpetas
  • wa find - Buscar archivos

📄 Archivos:
  • wa open - Abrir archivos
  • wa copy - Copiar archivos
  • wa move - Mover archivos
  • wa delete - Eliminar archivos

⭐ Favoritos:
  • wa fav - Ver favoritos
  • wa fav-add - Agregar favorito

💡 Escribe "wa help" para ver la lista completa de comandos.`;
    }
}

module.exports = NLP;
