// require
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);

const User = require(`${process.cwd()}/user/User.js`);

const { MessageSelectMenu, MessageActionRow } = require(`discord.js`);

const CollectionManager = require(`${process.cwd()}/managers/CollectionManager.js`);

// functions
const functions = {
    name: "clearuser",
    alias: [],
    Execute(msg, args) {
        // check if author is opped
        const authorProfile = new User(msg.author.id);
        if (!authorProfile.isOpped()) return;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check argument length
        if (args.length !== 1) {
            embed.args["description"] = "Incorrect Usage! `!clearuser <user>`";
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
        
        // create the embed
        embed.args["description"] = "Please confirm this action."

        // create dropdow menu
        const selection = new MessageSelectMenu();
        selection.setCustomId("clearuser-dropdown");
        selection.setPlaceholder("Confirmation");
        selection.addOptions([
            {label: "Confirm", value: "confirm", description: "Confirm (clearing " + user.user.username + "'s data)", emoji: "✅"},
            {label: "Cancel", value: "cancel", description: "Cancel (clearing " + user.user.username + "'s data)", emoji: "❌"},
        ]);

        const dropdown = new MessageActionRow().addComponents(selection);

        // put user and author into collection
        CollectionManager.clearUserCollection.set(authorProfile.getId(), userProfile.getId());
        
        // send the message
        msg.channel.send({
            embeds: [embed.get()],
            components: [dropdown]
        });

        // clear the user from the collection if idle
        setTimeout(() => CollectionManager.clearUserCollection.delete(authorProfile.getId()), 1000 * 60);
    }
}

// export functions
module.exports = functions;