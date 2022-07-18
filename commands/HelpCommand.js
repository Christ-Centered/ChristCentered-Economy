//require
const { MessageActionRow, MessageSelectMenu } = require(`discord.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);

const Utils = require(`${process.cwd()}/utils/Utils.js`);

// functions
const functions = {
    name: "ehelp",
    alias: ["helpecon"],
    Execute(msg, args) {
        // check the argument length & return the proper version of the command
        if (args.length == 0) this.noArgs(msg);
        else this.yesArgs(msg, args);
    },

    noArgs: function(msg) {
        // create the main help menu embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());
        
        embed.args["fields"] = [
            {name: "Commands", value: "`!help commands`", inline: true},
            {name: "Stats", value: "`!help stats`", inline: true},
            {name: "Shop", value: "`!help shop`", inline: true},
            {name: "Mini-games", value: "`!help minigames`", inline: true},
            {name: "Gambling", value: "`!help gambling`", inline: true},
            {name: "Work", value: "`!help work`", inline: true},
            {name: "Trade", value: "`!help trade`", inline: true},
            {name: "Rob", value: "`!help rob`", inline: true},    
        ]
    
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
                embeds: [embed.get()],
                components: [dropdown]
            }
        );
    },

    yesArgs: function(msg, args) {
        // check args length
        if (args.length !== 1) {
            this.noArgs(msg);
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
            this.noArgs(msg);
            return;
        }

        // get help for selection
        const embed = this.getHelpEmbed(selection);

        // send the message
        msg.channel.send({ embeds: [embed.get()] });
    },

    getHelpEmbed: function(selection) {
        // set up initial embed content
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // add different descriptions, titles & fields based off of the selection
        switch (selection) {
            case "commands":
                embed.args["title"] = "-- Commands";
                embed.args["description"] = "```yaml\n!ehelp: Send the help message\n!shop: View the shop\n!stats: View a user's stats\n!buy: Buy an item from the shop\n!daily: Get your daily reward\n!deposit: Deposit money into your bank\n!economy-info: View the economy info\n!rob: Rob a user\n!withdraw: Withdraw money from your bank account\n!work: Claim your work paycheck```";
                break;
            case "stats":
                embed.args["title"] = "-- Stats";
                embed.args["description"] = "Every user's economy statistics are stored as data. You may check your own, or another user's stats by typing `!stats <user>`. (Make sure you ping them)";
                break;
            case "shop":
                embed.args["title"] = "-- Shop";
                embed.args["description"] = "In the shop you are able to buy different roles, prizes, and other things with coins. You can access the shop by typing `!shop`.";
                break;
            case "minigames":
                embed.args["title"] = "-- Mini-games";
                embed.args["description"] = ":warning: **In Development** :warning:";
                embed.args["fields"] = [
                    {name: "#1", value: "`<information>`", inline: true},
                    {name: "#2", value: "`<information>`", inline: true},
                    {name: "#3", value: "`<information>`", inline: true},
                ];
                break;
            case "gambling":
                embed.args["title"] = "-- Gambling";
                embed.args["description"] = "Gamble your money and life away with `!<whatever the command will be>`. Just make sure not to overdo it :)";
                break;
            case "work":
                embed.args["title"] = "-- Work";
                embed.args["description"] = "Use `!work` in frequent intervals to gain more coins."
                break;
            case "trade":
                embed.args["title"] = "-- Trade";
                embed.args["description"] = "Use the `!trade` command to trade things with other people. I don't know, Augustine hasn't told me how this would work :joy:\n- Yochran"
                break;
            case "rob":
                embed.args["title"] = "-- Rob";
                embed.args["description"] = "If you're in need of a quick buck, type `!rob <user>` for a chance to steal some money."
                break;
        }

        return embed;
    }
}

// export functions
module.exports = functions;