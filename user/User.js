// require
const Config = require("../config/Config.js");
const Utils = require("../utils/Utils.js");

const fs = require("fs");

// define config files
const config = Config.getConfig("config.json");
const stats = Config.getConfig("stats.json");

// list of valid keys
const validKeys = [
    "COINS",
    "STREAK",
    "BANK",
    "NETWORTH",
    "JOB"
];

// classes
class User {
    constructor(id) {
        this.id = id;
    }

    // get the user's id
    getId() { return this.id; }

    // check if an inputted key exists
    static keyExists(key) { return validKeys.includes(key.toUpperCase()); }

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
            COINS: 0,
            STREAK: 0,
            BANK: 0,
            NETWORTH: 0,
            JOB: false,
            ITEMS: []
        };

        stats[this.id] = stats["NewUser"];
        delete stats["NewUser"];

        // update the stats.json file
        fs.writeFileSync("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
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
        return userStats.COINS;
    }

    // get user's daily streak
    getStreak() {
        const userStats = this.getStats();
        return userStats.STREAK;
    }

    // get user's bank account value
    getBankAccount() {
        const userStats = this.getStats();
        return userStats.BANK;
    }

    // get user's net worth
    getNetWorth() {
        const userStats = this.getStats();
        return userStats.NETWORTH;
    }

    // get user's items
    getItems() {
        const userStats = this.getStats();
        return userStats.ITEMS;
    }

    // check if user has a job
    hasJob() {
        const userStats = this.getStats();
        return userStats.JOB == true;
    }

    // edit a user's stats
    setValue(key, value) {
        stats[this.getId()][key.toUpperCase()] = value;

        // update the stats.json file
        fs.writeFileSync("stats.json", JSON.stringify(stats, null, 2), function writeJSON(err) {
            if (err)
                Utils.logMessage("(Error) Could not update stats.json.");
        });
    }
}

module.exports = User;