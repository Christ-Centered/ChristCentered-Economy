// require
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");
const User = require("../user/User.js");

// functions
const functions = {
    name: "deposit",
    alias: [],
    Execute(msg, args) {
        // check if user is opped
        const userProfile = new User(msg.author.id);
        if (!userProfile.isOpped()) return;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length !== 1) {
            embed.args["description"] = "Incorrect Usage! `!deposit <amount>`";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check for initialization
        if (!userProfile.isInitialized())
            userProfile.initialize();

        // check if argument is a number
        var amount = parseInt(args[0]);
        if (!Number.isInteger(amount)) {
            embed.args["description"] = "Amount must be an integer!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if user doesn't have enough money
        if (userProfile.getCoins() < amount) {
            embed.args["description"] = "Insufficient Funds!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // deposit the money
        userProfile.setValue("COINS", userProfile.getCoins() - amount);
        userProfile.setValue("BANK", userProfile.getBankAccount() + amount);

        // send the message
        embed.args["description"] = "Successfully deposited **" + amount + "** :coin: into your bank account.";
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;