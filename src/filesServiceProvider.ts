import { FileManager } from "./fileManager";
import { IApp } from "@rheas/contracts/core";
import { ServiceProvider } from "@rheas/services";

export class FilesServiceProvider extends ServiceProvider {

    /**
     * Registers the file handler class on the app instance.
     * 
     * This service will be responsible for checking the various
     * properties of system file/directory and also operating on them
     */
    public register() {

        this.container.singleton(this.name, app => {
            return new FileManager(app as IApp);
        });
    }

}