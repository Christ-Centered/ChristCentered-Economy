// require
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");
const User = require("../user/User.js");
const Shop = require("../shop/Shop.js");
const Config = require("../config/Config.js");

// define config files
const shop = Config.getConfig("shop.json");

// functions
const functions = {
    name: "buy",
    alias: [],
    Execute(msg, args) {
        // check if user is opped
        const userProfile = new User(msg.author.id);
        if (!userProfile.isOpped()) return;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length < 1) {
            embed.args["description"] = "Incorrect Usage! `!buy <item name/id>`";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // merge args into string
        var entry = "";
        for (const word in args) {
            if (entry.length === 0) entry = args[word];
            else entry = entry + " " + args[word];
        }

        // item variable
        var item = entry;

        // if bought by ID
        if (Number.isInteger(parseInt(item))) item = Shop.getItem(parseInt(item));
        else item = Shop.getItem(item);

        // if entered name was incomplete/incorrect
        if (!item) {
            embed.args["description"] = "Could not find item. Make sure you typed the name/ID **fully**.";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // if role, check if user has role
        if (item.FUNCTION.TYPE === "ROLE") {
            const roleID = item.FUNCTION.ROLEID;
            const role = msg.guild.roles.cache.find(r => r.id === roleID);
            if (msg.member.roles.cache.has(role.id)) {
                embed.args["description"] = "You already have this role!";
                msg.channel.send({ embeds: [embed.get()] });
                return;
            }
        }

        // check if user has sufficient funds
        if (userProfile.getCoins() < item.PRICE) {
            embed.args["description"] = "Insufficient Funds!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // run the function
        Shop.runFunction(msg, item);

        // take the money
        userProfile.setValue("COINS", userProfile.getCoins() - item.PRICE); 

        // send the message
        embed.args["description"] = "You have bought **" + item.NAME + "** for **" + item.PRICE + "** :coin:.";
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;