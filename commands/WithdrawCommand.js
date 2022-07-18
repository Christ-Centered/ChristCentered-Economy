// require
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const User = require(`${process.cwd()}/user/User.js`);

// functions
const functions = {
    name: "withdraw",
    alias: [],
    Execute(msg, args) {
        // check if user is opped
        const userProfile = new User(msg.author.id);

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length !== 1) {
            embed.args["description"] = "Incorrect Usage! `!withdraw <amount>`";
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

        // check if user's bank doesn't have enough money
        if (userProfile.getBankAccount() < amount) {
            embed.args["description"] = "Insufficient Funds!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // withdraw the money
        userProfile.setValue("COINS", userProfile.getCoins() + amount);
        userProfile.setValue("BANK", userProfile.getBankAccount() - amount);

        // send the message
        embed.args["description"] = "Successfully withdrawn **" + amount + "** :coin: from your bank account.";
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;