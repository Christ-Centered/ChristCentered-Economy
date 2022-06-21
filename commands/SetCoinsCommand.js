// require
const User = require("../user/User.js");
const CustomEmbed = require("../utils/CustomEmbed.js");

const Utils = require("../utils/Utils.js");

// functions
const functions = {
    name: "setcoins",
    alias: [],
    Execute(msg, args) {
        // create author user profile
        const authorProfile = new User(msg.author.id);

        // check if author has permission
        if (!authorProfile.isOpped()) return;

        // create default embed message
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length !== 2) {
            embed.args["description"] = "Incorrect Usage! `!setcoins <user> <amount>`"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if first argument is a mention
        if (!msg.mentions.members.first()) {
            embed.args["description"] = "User must be a mention!"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if second argument is a number
        var amount = parseInt(args[1]);
        if (!Number.isInteger(amount)) {
            embed.args["description"] = "Amount must be an integer!"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create user profile
        const user = msg.mentions.members.first();
        const userProfile = new User(user.id);

        // check for initialization
        if (!userProfile.isInitialized())
            userProfile.initialize();

        // set the users new coins value
        userProfile.setCoins(parseInt(amount));

        // create & send message
        embed.args["description"] = "Set <@" + user.id + ">'s coins to " + amount + ".";

        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;