"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
const fs_1 = __importDefault(require("fs"));
class FileManager {
    /**
     * Reads a JS file and returns the specified export module.
     *
     * @param filePath
     * @param module
     */
    readJsFile(filePath, module = "default") {
        if (this.fileExists(filePath)) {
            return require(filePath)[module];
        }
        return undefined;
    }
    /**
     * Read contents of a file and returns as string. Throws an exception if
     * an error occurs when reading
     *
     * @param filePath
     * @param encoding
     */
    readFile(filePath, encoding = "utf8") {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(filePath, { encoding }, (err, data) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(data.toString());
            });
        });
    }
    /**
     * Read contents of a file synchronously.
     *
     * @param filePath
     * @param encoding
     */
    readFileSync(filePath, encoding = "utf8") {
        if (this.fileExists(filePath)) {
            return fs_1.default.readFileSync(filePath, { encoding }).toString();
        }
        return "";
    }
    /**
     * Returns the file stats of the given path.
     *
     * @param path
     */
    fileStats(path) {
        return new Promise((resolve, reject) => {
            fs_1.default.lstat(path, (err, stats) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(stats);
            });
        });
    }
    /**
     * Checks if a file exists or not.
     *
     * @param filePath
     */
    async fileExists(filePath) {
        try {
            const stats = await this.fileStats(filePath);
            return stats.isFile();
        }
        catch (err) {
            return false;
        }
    }
    /**
     * Checks if a directory exists or not.
     *
     * @param dirPath
     */
    async directoryExists(dirPath) {
        try {
            const stats = await this.fileStats(dirPath);
            return stats.isDirectory();
        }
        catch (err) {
            return false;
        }
    }
}
exports.FileManager = FileManager;
