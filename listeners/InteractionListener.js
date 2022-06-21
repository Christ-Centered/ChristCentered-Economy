// require
const HelpCommand = require("../commands/HelpCommand.js");
const ShopCommand = require("../commands/ShopCommand.js");

const CustomEmbed = require('../utils/CustomEmbed.js');
const Utils = require("../utils/Utils.js");

// functions
const functions = {
    name: "InteractionListener",
    Trigger: function(interaction) {
        // make sure interaction is from a dropdown
        if (!interaction.isSelectMenu()) return;

        // define embed variable to send
        var embed;
        
        // define the selection
        const selection = interaction.values[0];

        // check which dropdown they clicked
        switch (interaction.customId) {
            case "help-dropdown":
                embed = HelpCommand.getHelpEmbed(selection);

                // send the message & delete message hub
                interaction.message.delete(1000);
                interaction.channel.send({ embeds: [embed.get()] });
                break;
            case "shop-dropdown":
                embed = ShopCommand.getShopEmbed(selection);

                // send the message & delete message hub
                interaction.message.delete(1000);
                interaction.channel.send({ embeds: [embed.get()] });
                break;
            case "clearlogs-dropdown":
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
                break;
        }
    }
}

// export functions
module.exports = functions;