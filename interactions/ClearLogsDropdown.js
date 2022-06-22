// require
const CustomEmbed = require('../utils/CustomEmbed.js');
const Utils = require("../utils/Utils.js");

const fs = require("fs");

// functions
const functions = {
    Interaction: function(interaction, selection) {
        // check if Yochran is the interactor
        if (interaction.user.id !== "350718252076367874") {
            interaction.channel.send("You do not have permission to do that.");
            return;
        }

        // clear the logs
        if (selection === "confirm") {
            // new logs data
            const logs = "-- Logs: --\n";

            // clear the logs file 
            fs.writeFileSync("logs.txt", logs, (err) => {
                if (err)
                    console.log("[ChristCentered Economy]: (Error) Error clearing logs file.");
            });

            // send the message
            const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());
            embed.args["description"] = "Cleared logs file. :white_check_mark:";
            interaction.channel.send({ embeds: [embed.get()] });
        }

        // delete the message
        interaction.message.delete(1000);
    }
}

// export functions
module.exports = functions;