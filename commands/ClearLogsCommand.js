// require
const fs = require("fs");

const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");

const { MessageActionRow, MessageSelectMenu } = require("discord.js");

// functions
const functions = {
    name: "clearlogs",
    alias: [],
    Execute(msg, args) {
        // check if Yochran is the author
        if (msg.author.id !== "350718252076367874") return;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());
        embed.args["description"] = "Please confirm this action."

        // create dropdow menu
        const selection = new MessageSelectMenu();
        selection.setCustomId("clearlogs-dropdown");
        selection.setPlaceholder("Confirmation");
        selection.addOptions([
            {label: "Confirm", value: "confirm", description: "Confirm (clearing the logs)", emoji: "✅"},
            {label: "Cancel", value: "cancel", description: "Cancel (clearing the logs)", emoji: "❌"},
        ]);

        const dropdown = new MessageActionRow().addComponents(selection);
        
        msg.channel.send({
            embeds: [embed.get()],
            components: [dropdown]
        });
    }
}

// export functions
module.exports = functions;