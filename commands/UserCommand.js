// require
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");

const User = require("../user/User.js");

// functions
const functions = {
    name: "user",
    alias: ["manageuser", "manage"],
    Execute(msg, args) {
        // check if author is opped
        const authorProfile = new User(msg.author.id);
        if (!authorProfile.isOpped()) return;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length != 3) {
            embed.args["description"] = "Incorrect Usage! `!user <user> <key> <value>`";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // check if first argument is valid
        const user = msg.mentions.members.first();
        if (!user) {
            embed.args["description"] = "User must be a mention!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create user profile
        const userProfile = new User(user.id);
        
        // check for initialization
        if (!userProfile.isInitialized())
            userProfile.initialize();

        // create variables for key and value
        const key = args[1].toUpperCase();
        var value = args[2].toLowerCase();

        // check if key is valid
        if (!User.keyExists(key)) {
            embed.args["description"] = "Invalid Key!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // parse the value
        if (value !== "true" && value !== "false") value = parseInt(value);
        else {
            if (value === "true") value = true;
            if (value === "false") value = false;
        }

        // update the user profile
        userProfile.setValue(key, value);

        embed.args["description"] = "(<@" + user.id + ">) Successfully set `" + key + "` to `" + value + "`. :white_check_mark:";
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;