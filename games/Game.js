// require
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");
const User = require("../user/User.js");

const GameManager = require("../managers/GameManager.js");

// classes
class Game {
    constructor(name) {
        this.name = name;
    }

    // get the name
    getName() { return this.name; }

    // start the game
    start() {
        // create the game variable
        const game = GameManager.getGame(this.getName());
        game.Start();
    }
}

// export classes
module.exports = Game;