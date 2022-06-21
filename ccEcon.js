// require
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const Utils = require("./utils/Utils.js");

const Config = require("./config/Config.js");

const HelpCommand = require("./commands/HelpCommand.js");
const StatsCommand = require("./commands/StatsCommand.js");
const SetCoinsCommand = require("./commands/SetCoinsCommand.js");

// startup function
client.once("ready", () => {
    // send startup message
    Utils.logMessage("ChristCentered Economy v1.0 is loading...");

    // set bot profile
    client.user.setStatus("online");
    client.user.setActivity("The Gospel.", {type: "LISTENING"});
    // loop setting the status message
    setInterval(() => { client.user.setActivity("The Gospel.", {type: "LISTENING"}); }, 5000 * 60);

    // send completion message
    Utils.logMessage("ChristCentered Economy v1.0 has successfully loaded.");
});

// message listener
client.on("messageCreate", (msg) => {
    // if the message comes from a bot
    if (msg.author.bot) return;

    // if message was a DM
    if (!msg.guild) {
        Utils.logMessage("Received a DM from " + msg.author.tag + ": " + msg.content);
        return;
    }

    // define config file 
    const config = Config.getConfig("config.json");

    // check if message was a command
    const prefix = config.Prefix;

    if (msg.content.startsWith(prefix)) {
        // create command & arguments
        const args = msg.content.slice(1).trim().split(" ");
        const command = args.shift().toLowerCase();

        // create executor variables
        const guild = msg.guild;
        const username = msg.author.username;

        // check what the command was
        switch (command) {
            case "helpdev":
                HelpCommand.Execute(msg, args);
                break;
            case "statsdev":
                StatsCommand.Execute(msg, args);
                break;
            case "setcoins":
                SetCoinsCommand.Execute(msg, args);
                break;
        }

        // log message to console
        const commands = config.Commands;

        if (commands.includes(command))
            Utils.logMessage("[" + guild.name + "], " + username + " has run a command: " + command);
    }
});

// dropdown interaction listener
client.on("interactionCreate", async (interaction) => {
    // make sure interaction is from a dropdown
    if (!interaction.isSelectMenu()) return;

    // define the selection
    const selection = interaction.values[0];

    // get the embed
    const embed = HelpCommand.getHelpEmbed(selection);

    // send the message & delete help hub
    interaction.message.delete(1000);
    interaction.channel.send({ embeds: [embed.get()] });
});

// log in the bot
const token = Config.getConfig("config.json").Token;
client.login(token);