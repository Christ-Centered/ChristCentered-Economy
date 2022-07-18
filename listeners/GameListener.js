// require
const Utils = require(`${process.cwd()}/utils/Utils.js`);

const CollectionManager = require(`${process.cwd()}/managers/CollectionManager.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);

const GuessTheNumber = require(`${process.cwd()}/games/minigames/GuessTheNumber.js`);

// functions
const functions = {
    name: "GameListener",
    Trigger: function(msg) {
        // if no game is running
        const collection = CollectionManager.games;
        if (collection.length == 0) return;

        // if the message comes from a bot
        if (msg.author.bot) return;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        collection.forEach((entry) => {
            switch(entry.getName()) {
                case "GuessTheNumber":
                    // check if message was in proper channel
                    if (msg.channel.id !== entry.getChannel().id) return;

                    // create the arguments
                    const args = msg.content.slice(0).trim().split(" ");
                    const number = args.shift().toLowerCase();

                    // get the data
                    const data = entry.getData();

                    // if right number
                    if (data.NUMBER === number) {
                        // run the reward function
                        GuessTheNumber.Reward(msg.author.id);

                        // end the game
                        entry.end();

                        // send the message
                        embed.args["description"] = "<@" + msg.author.id + "> guessed the number for **50** :coin:.";
                        msg.channel.send({ embeds: [embed.get()] });
                    }

                    break;
            }
        });
    }
}

// export functions
module.exports = functions;