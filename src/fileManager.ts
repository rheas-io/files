import { Exception } from '@rheas/errors';
import fs, { Stats, WriteFileOptions } from 'fs';
import { IFileManager } from '@rheas/contracts/files';

export class FileManager implements IFileManager {
    /**
     * Reads a JS file and returns the specified export module.
     *
     * @param filePath
     * @param module
     */
    public async readJs(filePath: string, module: string = 'default'): Promise<undefined | any> {
        if (await this.fileExists(filePath)) {
            return require(filePath)[module];
        }
        return undefined;
    }

    /**
     * Reads a JS file blocking read.
     *
     * @param filePath
     * @param module
     */
    public readJsSync(filePath: string, module: string = 'default'): undefined | any {
        if (this.fileExistsSync(filePath)) {
            return require(filePath)[module];
        }
        return undefined;
    }

    /**
     * Read contents of a file and returns a Buffer. Throws an exception if
     * an error occurs when reading
     *
     * @param filePath
     */
    public readFile(filePath: string): Promise<Buffer> {
        return new Promise<Buffer>((resolve, reject) => {
            fs.readFile(filePath, (err, data) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(data);
            });
        });
    }

    /**
     * Read contents of a file synchronously and returns the Buffer.
     *
     * @param filePath
     */
    public readFileSync(filePath: string): Buffer {
        return fs.readFileSync(filePath);
    }

    /**
     * Reads a file and returns the string
     *
     * @param filePath
     * @param encoding
     */
    public async readTextFile(filePath: string, encoding: string = 'utf8'): Promise<string> {
        const contents = await this.readFile(filePath);

        return contents.toString(encoding);
    }

    /**
     * Blocking text file read.
     *
     * @param filePath
     * @param encoding
     */
    public readTextFileSync(filePath: string, encoding: string = 'utf8'): string {
        const contents = this.readFileSync(filePath);

        return contents.toString(encoding);
    }

    /**
     * Writes the given data to the file. An exception will be thrown
     * if the path links to a directory or write fails.
     *
     * @param filePath
     * @param data
     * @param options
     */
    public async writeToFile(filePath: string, data: any, options: WriteFileOptions = {}) {
        // We will throw an exception, if the given filePath is
        // a directory. This will prevent replacing the directory with
        // a file.
        if (await this.directoryExists(filePath)) {
            throw new Exception(`Path ${filePath} is a directory. Aborting data write.`);
        }

        return new Promise<boolean>((resolve, reject) => {
            fs.writeFile(filePath, data, options, (err) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }
    
    /**
     * Deletes a file from the filesystem. Only files can be deleted
     * using this function and trying to delete a directory will throw
     * an exception.
     *
     * @param filePath
     */
    public async remove(filePath: string): Promise<boolean> {
        // We will throw an exception, if the given filePath is
        // a directory.
        if (await this.directoryExists(filePath)) {
            throw new Exception(`Path ${filePath} is a directory. Aborting delete request.`);
        }

        return new Promise<boolean>((resolve, reject) => {
            fs.unlink(filePath, (err) => {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(true);
            });
        });
    }

    /**
     * Returns the file stats of the given path.
     *
     * @param path
     */
    public fileStats(path: string): Promise<Stats> {
        return new Promise<Stats>((resolve, reject) => {
            fs.lstat(path, (err, stats) => {
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
    public async fileExists(filePath: string): Promise<boolean> {
        try {
            const stats = await this.fileStats(filePath);

            return stats.isFile();
        } catch (err) {
            return false;
        }
    }

    /**
     * Checks if a directory exists or not.
     *
     * @param dirPath
     */
    public async directoryExists(dirPath: string): Promise<boolean> {
        try {
            const stats = await this.fileStats(dirPath);

            return stats.isDirectory();
        } catch (err) {
            return false;
        }
    }

    /**
     * Blocking file stats getter.
     *
     * @param path
     */
    public fileStatsSync(path: string): Stats | null {
        try {
            return fs.lstatSync(path);
        } catch (err) {}

        return null;
    }

    /**
     * Returns true if a file exists. Blocking function.
     *
     * @param filePath
     */
    public fileExistsSync(filePath: string): boolean {
        const fileStats = this.fileStatsSync(filePath);

        if (fileStats === null) {
            return false;
        }
        return fileStats.isFile();
    }

    /**
     * Returns true if a directory exists. Blocking function.
     *
     * @param dirPath
     */
    public directoryExistsSync(dirPath: string): boolean {
        const fileStats = this.fileStatsSync(dirPath);

        if (fileStats === null) {
            return false;
        }
        return fileStats.isDirectory();
    }
}
