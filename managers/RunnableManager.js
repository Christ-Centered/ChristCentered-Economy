// require
const { Collection } = require("discord.js");

const runnableList = new Collection();

// classes
class RunnableManager {
    // initialize the runnables list
    static initializeRunnables(runnableFiles) {
        // loop through the files
        for (const file of runnableFiles) {
            // add the file's name and file to the list
            const runnable = require(`${process.cwd()}/runnables/` + file);
            runnableList.set(runnable.name, runnable);
        }
    }

    // get the list of runnables
    static getRunnables() { return runnableList; }
    
    // find a runnable by name
    static getRunnable(name) {
        // create runnable variable
        var runnable = this.getRunnables().get(name);

        // return the runnable
        return runnable;
    }
}

// export classes
module.exports = RunnableManager;