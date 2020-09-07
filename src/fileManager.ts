import fs, { Stats } from 'fs';

export class FileManager {
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
    public async readFileSync(filePath: string): Promise<Buffer | null> {
        if (await this.fileExists(filePath)) {
            return fs.readFileSync(filePath);
        }
        return null;
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
}
