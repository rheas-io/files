"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesServiceProvider = void 0;
var core_1 = require("@rheas/core");
var FilesServiceProvider = /** @class */ (function (_super) {
    __extends(FilesServiceProvider, _super);
    function FilesServiceProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Registers the file handler class on the app instance.
     *
     * This service will be responsible for checking the various
     * properties of system file/directory and also operating on them
     */
    FilesServiceProvider.prototype.register = function () {
        this.container.singleton(this.name, function (app) {
        });
    };
    return FilesServiceProvider;
}(core_1.ServiceProvider));
exports.FilesServiceProvider = FilesServiceProvider;
