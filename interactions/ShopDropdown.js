// require
const ShopCommand = require(`${process.cwd()}/commands/ShopCommand.js`);

// functions
const functions = {
    Interaction: function(interaction, selection) {
        const embed = ShopCommand.getShopEmbed(selection);

        // send the message & delete message hub
        interaction.message.delete(1000);
        interaction.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;