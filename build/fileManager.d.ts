/// <reference types="node" />
import { Stats } from "fs";
import { IApp } from "@rheas/contracts/core";
export declare class FileManager {
    /**
     * Application instance.
     *
     * @var IApp
     */
    protected _app: IApp;
    /**
     * Creates a new file manager which is responsible for
     * creating, deleting, read, write operations on a file.
     *
     * @param app
     */
    constructor(app: IApp);
    /**
     * Reads a JS file and returns the specified export module.
     *
     * @param filePath
     * @param module
     */
    readJsFile(filePath: string, module?: string): any;
    /**
     * Read contents of a file and returns as string. Throws an exception if
     * an error occurs when reading
     *
     * @param filePath
     * @param encoding
     */
    readFile(filePath: string, encoding?: string): Promise<string>;
    /**
     * Read contents of a file synchronously.
     *
     * @param filePath
     * @param encoding
     */
    readFileSync(filePath: string, encoding?: string): string;
    /**
     * Returns the file stats of the given path.
     *
     * @param path
     */
    fileStats(path: string): Promise<Stats>;
    /**
     * Checks if a file exists or not.
     *
     * @param filePath
     */
    fileExists(filePath: string): Promise<boolean>;
    /**
     * Checks if a directory exists or not.
     *
     * @param dirPath
     */
    directoryExists(dirPath: string): Promise<boolean>;
}
