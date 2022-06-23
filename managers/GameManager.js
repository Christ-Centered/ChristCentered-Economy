// require
const { Collection } = require("discord.js");

const gameList = new Collection();

// classes
class GameManager {
    // initialize the game list
    static initializeGames(gameFiles) {
        // loop through the files
        for (const file of gameFiles) {
            // add the file's name and file to the list
            const runnable = require(`../games/minigames/` + file);
            gameList.set(runnable.name, runnable);
        }
    }

    // get the list of games
    static getGames() { return gameList; }
    
    // find a runnable by name
    static getGame(name) {
        // create runnable variable
        var game = this.getGames().get(name);

        // return the runnable
        return game;
    }
}

// export classes
module.exports = GameManager;