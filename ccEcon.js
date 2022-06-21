// require
const { Client, Intents, DiscordAPIError, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const Utils = require("./utils/Utils.js");
const Config = require("./config/Config.js");

const fs = require("fs");
const HelpCommand = require("./commands/HelpCommand.js");

// setup commands
const commandsList = new Collection();
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/` + file);
    commandsList.set(command.name, command);
}


// startup function
client.once("ready", () => {
    // send startup message
    Utils.logMessage("ChristCentered Economy v1.0 is loading...");

    // set bot profile
    const presence = {
        status: "online",
        activity: {
            type: "LISTENING",
            name: "The Gospel."
        }
    };

    client.user.setPresence(presence);
    // loop setting the status message
    setInterval(() => client.user.setPresence(presence), 5000 * 60);

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
        const commandName = args.shift().toLowerCase();

        // create executor variables
        const guild = msg.guild;
        const username = msg.author.username;

        // execute the command
        const command = commandsList.get(`${commandName}`);

        if (!command) return;

        command.Execute(msg, args);

        // log message to console
        if (commandsList.has(commandName))
            Utils.logMessage("[" + guild.name + "], " + username + " has run a command: " + commandName);
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