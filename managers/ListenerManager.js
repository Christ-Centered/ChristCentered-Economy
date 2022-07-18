// require
const { Collection } = require("discord.js");

const listenerList = new Collection();

// classes
class ListenerManager {
    // initialize the listener list
    static initializeListeners(listenerFiles) {
        // loop through the files
        for (const file of listenerFiles) {
            // add the file's name and file to the list
            const command = require(`${process.cwd()}/listeners/` + file);
            listenerList.set(command.name, command);
        }
    }

    // get the list of listeners
    static getListeners() { return listenerList; }
    
    // find a listener by name
    static getListener(name) {
        // create listener variable
        var listener = this.getListeners().get(name);

        // return the listener
        return listener;
    }
}

// export classes
module.exports = ListenerManager;