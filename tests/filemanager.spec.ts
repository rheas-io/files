import path from 'path';
import { FileManager } from '../src/fileManager';

describe('Check file manager functions', () => {
    /**
     * FileManager object that has to be tested.
     *
     * @var FileManager
     */
    const fs = new FileManager();

    /**
     * File paths to use in this testing.
     */
    const js = path.resolve(__dirname, 'testJs.js');
    const json = path.resolve(__dirname, 'testJson.json');
    const falseFile = path.resolve(__dirname, 'testFalse.json');
    const falseDir = path.resolve(__dirname, '..', 'layout');

    /**
     * Tests if JS file reads are passing/failing on different
     * cases.
     *
     * 1. Read a valid file.
     * 2. Read default module.
     * 3. Read named module.
     * 4. Read an invalid module.
     * 5. Read an invalid file.
     */
    it('js file read', () => {
        // Read contents of js file. Reads default if no module specified.
        expect(fs.readJs(js)).resolves.toHaveProperty('module', 'defaultModule');

        // Calls default module
        expect(fs.readJs(js, 'default')).resolves.toHaveProperty('module', 'defaultModule');

        // Calls named module - testConfig
        expect(fs.readJs(js, 'testConfig')).resolves.toHaveProperty('module', 'testConfig');

        // Calls invalid module - abcdef
        expect(fs.readJs(js, 'abcdef')).resolves.toBe(undefined);

        // Calls invalid js - promise resolves to false and returns undefined
        // if file does not exists.
        expect(fs.readJs(falseFile)).resolves.toBe(undefined);

        // Invalid json `default` module to be undefined.
        expect(fs.readJs(json)).resolves.toBe(undefined);
    });

    /**
     * Tests async file reads.
     *
     * 1. Read contents of js file.
     * 2. Read contents of json file.
     * 3. Read contents of image file.
     * 4. Read contents of non-existant file.
     */
    it('async read file and return string', () => {
        expect(fs.readFile(js)).toBeInstanceOf(Promise);

        // Read contents of js file
        expect(fs.readFile(js)).resolves.toBeInstanceOf(Buffer);
        // Read contents of json file
        expect(fs.readFile(json)).resolves.toBeInstanceOf(Buffer);
        // Read contents of image file
        let filePath = path.resolve(__dirname, 'testImage.png');
        expect(fs.readFile(filePath)).resolves.toBeInstanceOf(Buffer);

        // Read contents of non-existant file
        expect(fs.readFile(falseFile)).rejects.toThrow();
    });

    /**
     * Tests synchronous file reads.
     *
     * 1. Read contents of js file.
     * 2. Read contents of json file.
     * 3. Read contents of image file.
     * 4. Read contents of non-existant file.
     */
    it('sync read file and return buffer', () => {
        // Read contents of js file
        expect(fs.readFileSync(js)).resolves.toBeInstanceOf(Buffer);

        // Read contents of json file
        expect(fs.readFileSync(json)).resolves.toBeInstanceOf(Buffer);

        // Read an image file
        let filePath = path.resolve(__dirname, 'testImage.png');
        expect(fs.readFileSync(filePath)).resolves.toBeInstanceOf(Buffer);

        // Read contents of non-existant file
        expect(fs.readFileSync(falseFile)).resolves.toBe(null);
    });

    /**
     * Reads a file and converts it into a string text.
     */
    it('read text from file', () => {
        // Read contents of js file
        expect(fs.readTextFile(js)).resolves.toContain('exports.default');

        // Read text of json file
        expect(fs.readTextFile(json)).resolves.toContain('JSON');

        // Read text of non-existant file
        expect(fs.readTextFile(falseFile)).rejects.toThrow();
    });

    /**
     * Tests file stats of a path.
     *
     * 1. Read non-existant file stat.
     * 2. Read non-existant directory stat.
     * 3. Existing dir stat check.
     * 4. Existing file stat check.
     * 5. Dot file check
     */
    it('file stats check', async () => {
        // Invalid file stats - throws error
        let promise = fs.fileStats(falseFile);
        expect(promise).rejects.toThrow();

        // Invalid directory stats - throws error
        promise = fs.fileStats(falseDir);
        expect(promise).rejects.toThrow();

        // Valid file stats
        promise = fs.fileStats(json);
        expect(promise).resolves.not.toThrow();

        // Valid directory stats
        promise = fs.fileStats(path.resolve(__dirname));
        expect(promise).resolves.not.toThrow();

        // Dot file stats
        let fileStats = await fs.fileStats(path.resolve(__dirname) + '/..');
        expect(fileStats.isDirectory()).toBe(true);
    });

    /**
     * Tests file existance.
     *
     * 1. Test non-existant file.
     * 2. Existing file check.
     * 3. Test existing directory check - should fail.
     * 4. Dot file check
     */
    it('file exists check', async () => {
        // Valid file check
        let fileExists = await fs.fileExists(js);
        expect(fileExists).toBe(true);

        // Invalid file check
        fileExists = await fs.fileExists(falseFile);
        expect(fileExists).toBe(false);

        // Directory check for a file exists
        fileExists = await fs.fileExists(path.resolve(__dirname));
        expect(fileExists).toBe(false);

        // Dot file should return false
        fileExists = await fs.fileExists(path.resolve(__dirname) + '/..');
        expect(fileExists).toBe(false);
    });

    /**
     * Tests dir existance.
     *
     * 1. Test non-existant directory.
     * 2. Existing dir check.
     * 3. Test esisting file check - should fail.
     * 4. Dot file check
     */
    it('directory exists check', async () => {
        // Valid directory check
        let directoryExists = await fs.directoryExists(path.resolve(__dirname));
        expect(directoryExists).toBe(true);

        // Invalid directory check
        directoryExists = await fs.directoryExists(falseDir);
        expect(directoryExists).toBe(false);

        // File check for a directory exists
        directoryExists = await fs.directoryExists(js);
        expect(directoryExists).toBe(false);

        // Dot file should return true
        directoryExists = await fs.directoryExists(path.resolve(__dirname) + '/..');
        expect(directoryExists).toBe(true);
    });
});
