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
    it('js file read', () => {});

    /**
     * Tests async file reads.
     *
     * 1. Read contents of js file.
     * 2. Read contents of json file.
     * 3. Read contents of image file.
     * 4. Read contents of non-existant file.
     */
    it('async read file and return string', () => {});

    /**
     * Tests synchronous file reads.
     *
     * 1. Read contents of js file.
     * 2. Read contents of json file.
     * 3. Read contents of image file.
     * 4. Read contents of non-existant file.
     */
    it('async read file and return string', () => {});

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
        let fileStats;

        // Invalid file stats - throws error
        let promise = fs.fileStats(falseFile);
        await expect(promise).rejects.toThrow();

        // Invalid directory stats - throws error
        promise = fs.fileStats(falseDir);
        await expect(promise).rejects.toThrow();

        // Valid file stats
        promise = fs.fileStats(json);
        await expect(promise).resolves.not.toThrow();

        // Valid directory stats
        promise = fs.fileStats(path.resolve(__dirname));
        await expect(promise).resolves.not.toThrow();

        // Dot file stats
        fileStats = await fs.fileStats(path.resolve(__dirname) + '/..');
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
