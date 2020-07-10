"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
var fs_1 = __importDefault(require("fs"));
var FileManager = /** @class */ (function () {
    /**
     * Creates a new file manager which is responsible for
     * creating, deleting, read, write operations on a file.
     *
     * @param app
     */
    function FileManager(app) {
        this._app = app;
    }
    /**
     * Reads a JS file and returns the specified export module.
     *
     * @param filePath
     * @param module
     */
    FileManager.prototype.readJsFile = function (filePath, module) {
        if (module === void 0) { module = "default"; }
        if (this.fileExists(filePath)) {
            return require(filePath)[module];
        }
        return undefined;
    };
    /**
     * Read contents of a file and returns as string. Throws an exception if
     * an error occurs when reading
     *
     * @param filePath
     * @param encoding
     */
    FileManager.prototype.readFile = function (filePath, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        return new Promise(function (resolve, reject) {
            fs_1.default.readFile(filePath, { encoding: encoding }, function (err, data) {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(data.toString());
            });
        });
    };
    /**
     * Read contents of a file synchronously.
     *
     * @param filePath
     * @param encoding
     */
    FileManager.prototype.readFileSync = function (filePath, encoding) {
        if (encoding === void 0) { encoding = "utf8"; }
        if (this.fileExists(filePath)) {
            return fs_1.default.readFileSync(filePath, { encoding: encoding }).toString();
        }
        return "";
    };
    /**
     * Returns the file stats of the given path.
     *
     * @param path
     */
    FileManager.prototype.fileStats = function (path) {
        return new Promise(function (resolve, reject) {
            fs_1.default.lstat(path, function (err, stats) {
                if (err !== null) {
                    return reject(err);
                }
                return resolve(stats);
            });
        });
    };
    /**
     * Checks if a file exists or not.
     *
     * @param filePath
     */
    FileManager.prototype.fileExists = function (filePath) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileStats(filePath)];
                    case 1:
                        stats = _a.sent();
                        return [2 /*return*/, stats.isFile()];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if a directory exists or not.
     *
     * @param dirPath
     */
    FileManager.prototype.directoryExists = function (dirPath) {
        return __awaiter(this, void 0, void 0, function () {
            var stats, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.fileStats(dirPath)];
                    case 1:
                        stats = _a.sent();
                        return [2 /*return*/, stats.isDirectory()];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return FileManager;
}());
exports.FileManager = FileManager;