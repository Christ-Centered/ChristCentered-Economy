// require
const Utils = require("../../utils/Utils.js");
const CustomEmbed = require("../../utils/CustomEmbed.js");
const User = require("../../user/User");

// const functions
const functions = {
    name: "GuessTheNumber",
    Reward(winner) {
        // get the winner profile
        const winnerProfile = new User(winner);

        // give the winner the coins
        winnerProfile.setValue("COINS", winnerProfile.getCoins() + 50);
    },

    Start(game) {
        // create the initial embed
        const initialEmbed = new CustomEmbed(Utils.getDefaultEmbedOptions());
        initialEmbed.args["description"] = "Guess a number, `1` - `10`!\n**Reward:** 50 :coin:";

        // get the channel
        const channel = game.getChannel();

        // send the initial embed
        channel.send({ embeds: [initialEmbed.get()] });

        // create the numbers
        const numbers = ["1","2","3","4","5","6","7","8","9","10"];

        // random number
        const number = numbers[Utils.getRandomNumber(numbers.length)];

        // export to the data
        game.setData({
            NUMBER: number
        });
    }
}

// export functions
module.exports = functions;