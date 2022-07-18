// require
const Config = require("../config/Config.js");
const fs = require("fs");
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");

// creat the config
const config = Config.getConfig("config.json");

// functions
const functions = {
    name: "enable",
    alias: ["enable-dev"],
    Execute(msg, args) {
        // check if user is Yochran
        if (msg.author.id !== "350718252076367874") return;

        // disable the bot
        config.Disabled = false;

        // update the stats.json file
        fs.writeFileSync("config.json", JSON.stringify(config, null, 2), function writeJSON(err) {
            if (err)
                Utils.logMessage("(Error) Could not update config.json.");
        });

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());
        embed.args["description"] = "(:white_check_mark:) Bot successfully enabled.";

        // send the embed
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;