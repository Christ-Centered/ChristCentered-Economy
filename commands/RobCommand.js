// require
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const User = require(`${process.cwd()}/user/User.js`);
const CollectionManager = require(`${process.cwd()}/managers/CollectionManager.js`);

// functions
const functions = {
    name: "rob",
    alias: [],
    Execute(msg, args) {
        // check if author is opped
        const authorProfile = new User(msg.author.id);

        // check for initialization
        if (!authorProfile.isInitialized())
            authorProfile.initialize();

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // create the cooldown collection
        const cooldown = CollectionManager.cooldowns;

        if (cooldown.has(msg.author.id)) {
            embed.args["description"] = "You are on cooldown for that!"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // if broke
        if (authorProfile.getCoins() < 1000) {
            embed.args["description"] = "Insufficient Funds! (1000 :coin: +)"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check argument length
        if (args.length !== 1) {
            embed.args["description"] = "Incorrect Usage! `!rob <user>`"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if first argument is a user
        const user = msg.mentions.members.first();
        if (!user) {
            embed.args["description"] = "User must be a mention!"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if first mention is author
        if (user.id === msg.author.id) {
            embed.args["description"] = "You cannot rob yourself!"
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create the user profile
        const userProfile = new User(user.id);

        // check for initialization
        if (!userProfile.isInitialized())
            userProfile.initialize();

        // check if broke
        if (userProfile.getCoins() <= 0) {
            embed.args["description"] = "User does not have any money in their wallet."
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        const cooldownLength = 1000 * 60 * 3;

        // put user in the cooldown
        cooldown.set(msg.author.id, cooldownLength);

        // expire the cooldown
        setTimeout(() => cooldown.delete(msg.author.id), cooldownLength);

        // get the chance of success
        const chance = Utils.getRandomNumber(100);

        // if caught
        if (chance < 50) {
            authorProfile.setValue("COINS", authorProfile.getCoins() - 1000);
            userProfile.setValue("COINS", userProfile.getCoins() + 1000);
            embed.args["description"] = "You were caught by the police! You paid <@" + user.id + "> 1,000 :coin:";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        const amountToSteal = Math.floor(Math.random() * userProfile.getCoins());

        // if succeded
        authorProfile.setValue("COINS", authorProfile.getCoins() + amountToSteal);
        userProfile.setValue("COINS", userProfile.getCoins() - amountToSteal);

        // send the message
        embed.args["description"] = "You successfully robbed <@" + user.id + "> for **" + amountToSteal + "** :coin:!";
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;