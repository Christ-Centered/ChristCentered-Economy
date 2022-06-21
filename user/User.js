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

    // get the user's id
    getId() { return this.id; }

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
            Coins: 0,
            DailyStreak: 0,
            BankAccount: 0,
            NetWorth: 0,
            Job: false,
            Items: []
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

    // get user's daily streak
    getDailyStreak() {
        const userStats = this.getStats();
        return userStats.DailyStreak;
    }

    // get user's bank account value
    getBankAccount() {
        const userStats = this.getStats();
        return userStats.BankAccount;
    }

    // get user's net worth
    getNetWorth() {
        const userStats = this.getStats();
        return userStats.NetWorth;
    }

    // get user's items
    getItems() {
        const userStats = this.getStats();
        return userStats.Items;
    }

    // check if user has a job
    hasJob() {
        const userStats = this.getStats();
        return userStats.Job == true;
    }

    // edit a user's stats
    setValue(key, value) {
        stats[this.id][key] = value;

        // update the stats.json file
        fs.writeFile("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
            if (err)
                Utils.logMessage("(Error) Could not update stats.json.");
        });
    }
}

module.exports = User;