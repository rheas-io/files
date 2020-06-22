import { ServiceProvider } from "@rheas/core";

export class FilesServiceProvider extends ServiceProvider {

    /**
     * Registers the file handler class on the app instance.
     * 
     * This service will be responsible for checking the various
     * properties of system file/directory and also operating on them
     */
    public register() {

        this.container.singleton(this.name, app => {

        });
    }

}