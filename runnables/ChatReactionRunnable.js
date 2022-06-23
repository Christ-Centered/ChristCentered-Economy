// require
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");
const User = require("../user/User.js");
const Game = require("../games/Game.js");

// runnables
const runnables = {
    name: "ChatReactionRunnable",
    timer: (1000 * 10),
    Run(client) {
        // loop
        setInterval(() => {
            // will do this tomorrow
        }, this.timer);
    }
}

// export runnables
module.exports = runnables;