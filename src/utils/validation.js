const fs = require('fs');
const path = require('path');

class Validation {
    static fileExists(filePath) {
        return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
    }

    static directoryExists(dirPath) {
        return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
    }

    static pathExists(targetPath) {
        return fs.existsSync(targetPath);
    }

    static resolvePath(targetPath) {
        return path.resolve(targetPath);
    }

    static isValidPath(targetPath) {
        try {
            path.parse(targetPath);
            return true;
        } catch (error) {
            return false;
        }
    }

    static isAbsolutePath(targetPath) {
        return path.isAbsolute(targetPath);
    }

    static hasExtension(filename, extension) {
        return path.extname(filename).toLowerCase() === extension.toLowerCase();
    }

    static isHiddenFile(filename) {
        return path.basename(filename).startsWith('.');
    }
}

module.exports = Validation;
