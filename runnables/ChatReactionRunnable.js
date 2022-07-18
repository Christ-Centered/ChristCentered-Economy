// require
const CollectionManager = require(`${process.cwd()}/managers/CollectionManager.js`);
const Game = require(`${process.cwd()}/games/Game.js`);

// runnables
const runnables = {
    name: "ChatReactionRunnable",
    timer: (1000 * 60 * 5),
    Run(client) {
        // loop
        setInterval(() => {
            // temporarily disabled
            if (true) return;

            // check if game is running
            const collection = CollectionManager.games;

            var gameIsRunning = false;

            // if games are running
            if (collection.length > 0) {
                collection.forEach((entry) => {
                    // check if the game is a guess the number
                    if (entry.getName() === "GuessTheNumber")
                        gameIsRunning = true;
                });
            }

            if (gameIsRunning) return;

            // create the channel
            const guild = client.guilds.cache.get("843897761580449863");
            const channel = guild.channels.cache.get("988130736290820108");
    
            // create the game
            const game = new Game(client, "GuessTheNumber", channel);
    
            // start the game
            game.start();
        }, this.timer);
    }
}

// export runnables
module.exports = runnables;