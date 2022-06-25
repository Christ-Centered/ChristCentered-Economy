// require
const GameManager = require("../managers/GameManager.js");
const CollectionManager = require("../managers/CollectionManager.js");

// classes
class Game {
    constructor(client, name, channel) {
        this.client = client;
        this.name = name;
        this.channel = channel;

        this.winner = undefined;
        this.reward = undefined;
        this.data = {};

        this.games.push(this);
    }

    // list of games
    games = [];

    // get games list
    static getGames() { return this.games; }

    // get the name
    getName() { return this.name; }

    // get the client
    getClient() { return this.client; }

    // get the winner
    getWinner() { return this.winner; }

    // get the winner
    getReward() { return this.reward; }

    // get the channel
    getChannel() { return this.channel; }

    // get the data
    getData() { return this.data; }

    // set the data
    setData(data) { this.data = data; }

    // set the reward
    setReward(reward) { this.reward = reward; }

    // set the winner
    setWinner(winner) { this.winner = winner; }

    // start the game
    start() {
        // create the game variable
        const game = GameManager.getGame(this.getName());
        game.Start(this);

        // add to the list
        CollectionManager.games.push(this);
    }

    // end the game
    end() {
        // create the collection variable
        const collection = CollectionManager.games;

        // check if its the right game
        for (const entry in collection) {
            if (collection[entry].getName() === this.getName())
                delete collection[entry];
        }
    }
}

// export classes
module.exports = Game;