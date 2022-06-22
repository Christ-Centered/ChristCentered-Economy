// require
const HelpCommand = require("../commands/HelpCommand.js");

// functions
const functions = {
    Interaction: function(interaction, selection) {
        const embed = HelpCommand.getHelpEmbed(selection);

        // send the message & delete message hub
        interaction.message.delete(1000);
        interaction.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;