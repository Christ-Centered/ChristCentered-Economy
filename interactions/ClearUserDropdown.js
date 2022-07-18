// require
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const User = require(`${process.cwd()}/user/User.js`);

const CollectionManager = require(`${process.cwd()}/managers/CollectionManager.js`);

// functions
const functions = {
    Interaction: function(interaction, selection) {
        // create interactor profile
        const authorProfile = new User(interaction.user.id);

        if (!authorProfile.isOpped()) {
            interaction.channel.send("You do not have permission to do that.");
            return;
        }

        // create the variable for the collection
        const collection = CollectionManager.clearUserCollection;

        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check if interaction is expired
        if (!collection.has(authorProfile.getId())) {
            embed.args["description"] = "This interaction expired.";
            interaction.channel.send({ embeds: [embed.get()] });
            interaction.message.delete(1000);
            return;
        }

        // clear the user's data
        if (selection === "confirm") {
            // create user profile
            const userProfile = new User(collection.get(authorProfile.getId()));

            // check if null
            if (!userProfile) {
                embed.args["description"] = "User was null. :x:";
                interaction.channel.send({ embeds: [embed.get()] });
                return;
            }

            // clear the data
            userProfile.initialize();

            // send the message
            embed.args["description"] = "Cleared <@" + userProfile.getId() + ">'s data. :white_check_mark:";
            interaction.channel.send({ embeds: [embed.get()] });
        }

        // delete the message
        interaction.message.delete(1000);

        // clear them from the collection
        collection.delete(authorProfile.getId());
    }
}

// export functions
module.exports = functions;