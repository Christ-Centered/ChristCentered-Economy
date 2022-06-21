// require
const Config = require("../config/Config.js");
const Utils = require("../utils/Utils.js");

const fs = require("fs");

// define config files
const config = Config.getConfig("config.json");
const stats = Config.getConfig("stats.json");

// classes
class User {
    constructor(id) {
        this.id = id;
    }

    // checks if user is initialized
    isInitialized() {
        const exists = stats[this.id];
        if (!exists) return false;

        return true;
    }

    // initialize user
    initialize() {
        // setup temp profile
        stats.NewUser = {
            Coins: 0
        };

        stats[this.id] = stats["NewUser"];
        delete stats["NewUser"];

        // update the stats.json file
        fs.writeFile("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
            if (err)
                Utils.logMessage("(Error) Could not update stats.json.");
        });
    }

    // check if user is opped
    isOpped() {
        // create opped users list
        const oppedUsers = config.OppedUsers;
        return oppedUsers.includes(this.id);
    }

    // get the user's stats as a json object
    getStats() {
        return stats[this.id];
    }

    // get user's amount of coins
    getCoins() {
        const userStats = this.getStats();
        return userStats.Coins;
    }

    // set user's amount of coins
    setCoins(amount) {
        stats[this.id].Coins = amount;

        // update the stats.json file
        fs.writeFile("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
            if (err)
                Utils.logMessage("(Error) Could not update stats.json.");
        });
    }
}

module.exports = User;