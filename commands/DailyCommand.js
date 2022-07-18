// require
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const TimeUtils = require(`${process.cwd()}/utils/TimeUtils.js`);

const User = require(`${process.cwd()}/user/User.js`);

const { Collection } = require("discord.js");

// daily list
const collection = new Collection();

// functions
const functions = {
    name: "daily",
    alias: ["dailyreward", "dr"],
    Execute(msg, args) {
        // check if author is opped
        const user = new User(msg.author.id);

        // check for initialization
        if (!user.isInitialized())
            user.initialize();

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // get the current time
        const current = new Date().getTime();

        // check if user has already claimed daily reward
        if (collection.has(user.getId())) {
            // get the time remaining (expiration - current time)
            const remaining = collection.get(user.getId()) - current;

            // convert that time to readable text
            const remainingStr = TimeUtils.getTimeStr(remaining);

            embed.args["description"] = "You have already claimed your daily reward! Come back in " + remainingStr + " to claim again.";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create the variable for cooldown time
        const time = 1000 * 60 * 60 * 24;

        // get the expiration date
        const expire = current + time;

        // set the user's timer
        collection.set(user.getId(), expire);

        // generate a random number of coins
        const highest = 120;
        const lowest = 50;

        const range = (highest - lowest) + 1;
        var coins = Math.floor((Math.random() * range) + lowest);

        // update daily streak
        user.setValue("STREAK", user.getStreak() + 1);

        // check if they should receive streak bonus
        if (user.getStreak() == 7) coins = coins * 4;

        // give the user the coins
        user.setValue("COINS", user.getCoins() + coins);

        // send the message
        embed.args["description"] = "You have claimed your daily reward of " + coins + ":coin:! Come back in 24 hours to claim again.";
        msg.channel.send({ embeds: [embed.get()] });

        // expire the user's timer
        setTimeout(() => collection.delete(user.getId()), time);
    }
}

// export the functions
module.exports = functions;