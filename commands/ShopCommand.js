// require
const Utils = require("../utils/Utils.js");
const CustomEmbed = require("../utils/CustomEmbed.js");
const User = require("../user/User.js");

const { MessageActionRow, MessageSelectMenu } = require("discord.js");

// functions
const functions = {
    name: "shop",
    alias: ["store","market"],
    Execute(msg, args) {
        // create author user profile
        const authorProfile = new User(msg.author.id);

        // check if author has permission
        if (!authorProfile.isOpped()) return;

        // create the message hub embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        embed.args["description"] = "Select the shop page you'd like to see";

        // create dropdow menu
        const selection = new MessageSelectMenu();
        selection.setCustomId("shop-dropdown");
        selection.setPlaceholder("Make Selection");
        selection.addOptions([
            {label: "Food", value: "food", description: "Show the food page"},
            {label: "Roles", value: "roles", description: "Show the roles page"},
            {label: "Permissions", value: "permissions", description: "Show the permissions page"},
        ]);

        const dropdown = new MessageActionRow().addComponents(selection);

        // send the message embed with the dropdown menu
        msg.channel.send(
            { 
                embeds: [embed.get()],
                components: [dropdown]
            }
        );
    },

    getShopEmbed: function(selection) {
        // create food page
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // add different descriptions, titles & fields based off of the selection
        switch (selection) {
            case "food":
                embed.args["description"] = "Use `!shop <item name>` or `!shop <item id>` to get more details about an item. Use `!buy <item name>` or `!buy <item id>` to buy an item.\n\n:coin: **Here are our food items:**";
                embed.args["fields"] = [
                    {name: "Coconut - :coin: 50", value: "`01`", inline: false},
                    {name: "Banana - :coin: 100", value: "`02`", inline: false},
                    {name: "Pizza - :coin: 100", value: "`03`", inline: false}
                ];
                break;
            case "roles":
                embed.args["description"] = "Use `!shop <item name>` or `!shop <item id>` to get more details about an item. Use `!buy <item name>` or `!buy <item id>` to buy an item.\n\n:coin: **Here are our roles:**";
                embed.args["fields"] = [
                    {name: "Hadith Rejector Role - :coin: 50", value: "`04`", inline: false},
                    {name: "Religion Enjoyer Role - :coin: 100", value: "`05`", inline: false},
                    {name: "Gold Role - :coin: 500", value: "`06`", inline: false},
                    {name: "Active User Role - :coin: 4000", value: "`07`", inline: false},
                    {name: "Veteran User Role - :coin: 9500", value: "`08`", inline: false},
                    {name: "Legend role - :coin: 55000", value: "`09`", inline: false}
                ];
                break;
            case "permissions":
                embed.args["description"] = "Use `!shop <item name>` or `!shop <item id>` to get more details about an item. Use `!buy <item name>` or `!buy <item id>` to buy an item.\n\n:coin: **Here are our permissions:**";
                embed.args["fields"] = [
                    {name: "Media+ - :coin: 27500", value: "`010`", inline: false},
                    {name: "GIF PERMS - :coin: 36000", value: "`011`", inline: false}
                ];
                break;
        }

        // return the proper embed
        return embed;
    }
}

// export functions
module.exports = functions;