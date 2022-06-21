// require
const User = require("../user/User.js");
const CustomEmbed = require("../utils/CustomEmbed.js");

const Utils = require("../utils/Utils.js");

// functions
const functions = {
    name: "stats",
    Execute(msg, args) {
        // create embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length !== 1) {
            embed.args["description"] = "Incorrect Usage! `!stats <user>`";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if argument is a mention
        if (!msg.mentions.members.first()) {
            embed.args["description"] = "User must be a mention!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create user profile
        const user = msg.mentions.members.first();
        const userProfile = new User(user.id);

        // get users coins
        const coins = userProfile.getCoins();

        // create & send the message
        embed.args["description"] = "<@" + user.id + "> has " + coins + " coins.";

        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;