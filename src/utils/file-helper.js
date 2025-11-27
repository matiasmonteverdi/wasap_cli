const fs = require('fs').promises;
const path = require('path');

class FileHelper {
    static async readFile(filePath) {
        return await fs.readFile(filePath, 'utf-8');
    }

    static async copyFile(source, destination) {
        return await fs.copyFile(source, destination);
    }

    static async moveFile(source, destination) {
        return await fs.rename(source, destination);
    }

    static async deleteFile(filePath) {
        return await fs.unlink(filePath);
    }

    static async getFileStats(filePath) {
        return await fs.stat(filePath);
    }

    static filterByType(items, type, basePath) {
        const typeMap = {
            picture: ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.webp'],
            document: ['.doc', '.docx', '.pdf', '.txt', '.odt', '.rtf', '.md'],
            video: ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm'],
            audio: ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.m4a', '.wma'],
            code: ['.js', '.ts', '.py', '.java', '.cpp', '.c', '.cs', '.php'],
            compressed: ['.zip', '.rar', '.7z', '.tar', '.gz']
        };

        const extensions = typeMap[type.toLowerCase()];
        if (!extensions) return items;

        return items.filter(item => {
            if (item.isDirectory()) return false;
            const ext = path.extname(item.name).toLowerCase();
            return extensions.includes(ext);
        });
    }

    static getFileIcon(filename) {
        const ext = path.extname(filename).toLowerCase();
        const iconMap = {
            // Código
            '.js': '📜', '.ts': '📜', '.json': '📋',
            '.py': '🐍', '.java': '☕', '.cpp': '⚙️',
            // Documentos
            '.txt': '📄', '.pdf': '📕', '.doc': '📘',
            '.docx': '📘', '.xls': '📗', '.xlsx': '📗',
            // Imágenes
            '.jpg': '🖼️', '.jpeg': '🖼️', '.png': '🖼️',
            '.gif': '🖼️', '.svg': '🎨', '.bmp': '🖼️',
            // Multimedia
            '.mp4': '🎬', '.avi': '🎬', '.mkv': '🎬',
            '.mp3': '🎵', '.wav': '🎵', '.flac': '🎵',
            // Comprimidos
            '.zip': '📦', '.rar': '📦', '.7z': '📦',
            // Otros
            '.html': '🌐', '.css': '🎨', '.md': '📝'
        };
        return iconMap[ext] || '📄';
    }

    static formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        if (bytes < 1024 * 1024 * 1024) {
            return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
        }
        return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    }

    static getFileExtension(filename) {
        return path.extname(filename).toLowerCase();
    }

    static getFileName(filePath) {
        return path.basename(filePath);
    }

    static getFileNameWithoutExtension(filePath) {
        return path.basename(filePath, path.extname(filePath));
    }
}

module.exports = FileHelper;