// require
const User = require("../user/User.js");
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");
const TimeUtils = require("../utils/TimeUtils.js");

const { Collection } = require("discord.js");

// timed list
const collection = new Collection();

// functions
const functions = {
    name: "work",
    alias: [],
    Execute(msg, args) {
        // check if user is opped
        const user = new User(msg.author.id);

        if (!user.isOpped()) return;

        // check if user is initialized
        if (!user.isInitialized())
            user.initialize();

        // create embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length > 1) {
            embed.args["description"] = "Incorrect Usage! `!work [claim]`";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // execute based off of argument length
        if (args.length == 0) this.startJob(msg, user);
        else this.claimCheck(msg, user);
    },

    startJob: function(msg, user) {
        // create embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check if user has a job
        if (user.hasJob()) {
            embed.args["description"] = "You already have a job! Type `!work claim` to claim your paycheck.";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // give the user the job
        user.setValue("JOB", true);

        // send the message
        embed.args["description"] = "You now have a job. Type `!work claim` to claim your first paycheck.";

        msg.channel.send({ embeds: [embed.get()] });
    },

    claimCheck: function(msg, user) {
        // create embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check if user has a job
        if (!user.hasJob()) {
            embed.args["description"] = "You don't have a job! Type `!work` to get started.";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // get the current time
        const current = new Date().getTime();

        // check if user has worked in the past hour
        if (collection.has(user.getId())) {
            // get the time remaining (expiration - current time)
            const remaining = collection.get(user.getId()) - current;

            // convert that time to readable text
            const remainingStr = TimeUtils.getTimeStr(remaining);

            embed.args["description"] = "You are still working! Come back in " + remainingStr + " to claim your next paycheck.";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create the cooldown time variable
        const time = 1000 * 60 * 60 * 1.5;

        // add user to the collection
        const expire = current + time;

        collection.set(user.getId(), expire);

        // generate a random number of coins
        const highest = 350;
        const lowest = 150;

        const range = (highest - lowest) + 1;
        const coins = Math.floor((Math.random() * range) + lowest);

        // give the user that number
        const currentCoins = user.getCoins();
        user.setValue("COINS", currentCoins + coins);

        // send the message
        embed.args["description"] = "You have claimed your paycheck for " + coins + " :coin:! Come back in 1.5 hours to work again.";
        msg.channel.send({ embeds: [embed.get()] });

        // set the timer to clear the user from the collection
        setTimeout(() => collection.delete(user.getId()), time);
    },


}

// export functions
module.exports = functions;