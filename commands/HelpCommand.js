//require
const { MessageActionRow, MessageSelectMenu } = require("discord.js");

const utils = require("../utils/utils.js");

// functions
const functions = {
    NoArgs: function(msg) {
        // create the main help menu embed
        const embed = utils.customEmbed({
            color: "AQUA",
            author: {
                name: "ChristCentered Economy Help",
                url: "",
                iconURL: "https://cdn.discordapp.com/attachments/758680334698414081/988454409912606750/CCLogo.gif"
            },
            fields: [
                {name: "Commands", value: "`!help commands`", inline: true},
                {name: "Stats", value: "`!help stats`", inline: true},
                {name: "Shop", value: "`!help shop`", inline: true},
                {name: "Mini-games", value: "`!help minigames`", inline: true},
                {name: "Gambling", value: "`!help gambling`", inline: true},
                {name: "Work", value: "`!help work`", inline: true},
                {name: "Trade", value: "`!help trade`", inline: true},
                {name: "Rob", value: "`!help rob`", inline: true},    
            ]
        });

        // create dropdow menu
        const selection = new MessageSelectMenu();
        selection.setCustomId("help-dropdown");
        selection.setPlaceholder("Make Selection");
        selection.addOptions([
            {label: "Commands", value: "commands", description: "Give the help page for commands"},
            {label: "Stats", value: "stats", description: "Give the help page for stats"},
            {label: "Shop", value: "shop", description: "Give the help page for shop"},
            {label: "Mini-games", value: "minigames", description: "Give the help page for minigames"},
            {label: "Gambling", value: "gambling", description: "Give the help page for gambling"},
            {label: "Work", value: "work", description: "Give the help page for work"},
            {label: "Trade", value: "trade", description: "Give the help page for trade"},
            {label: "Rob", value: "rob", description: "Give the help page for rob"},
        ]);

        const dropdown = new MessageActionRow().addComponents(selection);

        // send the message embed with the dropdown menu
        msg.channel.send(
            { 
                embeds: [embed],
                components: [dropdown]
            }
        );
    },

    YesArgs: function(msg, args) {
        // check args length
        if (args.length !== 1) {
            this.NoArgs(msg);
            return;
        }

        // define the selection
        const selection = args[0].toLowerCase();

        // make sure argument was valid
        const validArgs = [
            "commands",
            "stats",
            "shop",
            "minigames",
            "gambling",
            "work",
            "trade",
            "rob"
        ];

        if (!validArgs.includes(selection)) {
            this.NoArgs(msg);
            return;
        }

        // give help for selection
        const embed = this.getHelpEmbed(selection);

        // send the message
        msg.channel.send({ embeds: [embed] });
    },

    getHelpEmbed: function(selection) {
        // set up initial embed content
        var embedContent = {
            color: "AQUA",
            author: {
                name: "ChristCentered Economy Help",
                url: "",
                iconURL: "https://cdn.discordapp.com/attachments/758680334698414081/988454409912606750/CCLogo.gif"
            },
        };

        // add different descriptions, titles & fields based off of the selection
        switch (selection) {
            case "commands":
                embedContent["title"] = "-- Commands";
                embedContent["description"] = "```yaml\n!helpdev: Send the help message\n```";
                break;
            case "stats":
                embedContent["title"] = "-- Stats";
                embedContent["description"] = "Every user's economy statistics are stored as data. You may check your own, or another user's stats by typing `!stats <user>`. (Make sure you ping them)";
                break;
            case "shop":
                embedContent["title"] = "-- Shop";
                embedContent["description"] = "In the shop you are able to buy different roles, prizes, and other things with coins. You can access the shop by typing `!shop`.";
                break;
            case "minigames":
                embedContent["title"] = "-- Mini-games";
                embedContent["description"] = ":warning: **In Development** :warning:";
                embedContent["fields"] = [
                    {name: "#1", value: "`<information>`", inline: true},
                    {name: "#2", value: "`<information>`", inline: true},
                    {name: "#3", value: "`<information>`", inline: true},
                ];
                break;
            case "gambling":
                embedContent["title"] = "-- Gambling";
                embedContent["description"] = "Gamble your money and life away with `!<whatever the command will be>`. Just make sure not to overdo it :)";
                break;
            case "work":
                embedContent["title"] = "-- Work";
                embedContent["description"] = "Use `!work` in frequent intervals to gain more coins."
                break;
            case "trade":
                embedContent["title"] = "-- Trade";
                embedContent["description"] = "Use the `!trade` command to trade things with other people. I don't know, Augustine hasn't told me how this would work :joy:\n- Yochran"
                break;
            case "rob":
                embedContent["title"] = "-- Rob";
                embedContent["description"] = "If you're in need of a quick buck, type `!rob <user>` for a chance to steal some money."
                break;
        }

        // create the embed
        const embed = utils.customEmbed(embedContent);
        return embed;
    },

    Execute: function(msg, args) {
        // check the argument length & return the proper version of the command
        if (args.length == 0) this.NoArgs(msg);
        else this.YesArgs(msg, args);
    }
}

// export functions
module.exports = functions;