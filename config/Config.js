// require
const config = require("../config.json");
const stats = require("../stats.json");

const Utils = require("../utils/Utils.js");

// functions
const functions = {
    getConfig: function(name) {
        // define which config
        switch (name) {
            case "config.json": return config; 
            case "stats.json": return stats;
        }

        Utils.logMessage("(Error) Invalid config name entered.");
    }
}

// export functions
module.exports = functions;