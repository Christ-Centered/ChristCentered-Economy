// classes
class CommandManager {
    // initialize the command list
    static initializeCommands(commandsList, commandFiles) {
        // loop through the files
        for (const file of commandFiles) {
            // add the file's name and file to the list
            const command = require(`../commands/` + file);
            commandsList.set(command.name, command);
        }
    }
    
    // find a command by name or alias from the command list
    static getCommand(commandsList, name) {
        // create command variable
        var command = commandsList.get(name);

        // if not found with the name, check for alias
        if (!command) {
            // if alias is found in the list, make the command the file linked to that alias
            if (commandsList.find((com) => {
                if (com.alias.includes(name.toLowerCase()))
                    command = com;
            }));
        }

        // return the proper command
        return command;
    }
}

// export classes
module.exports = CommandManager;
