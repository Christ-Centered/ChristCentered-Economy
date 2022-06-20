// require
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const utils = require("./utils/utils.js");

const prefix = utils.getPrefix();
const commands = utils.getCommands();

const HelpCommand = require("./commands/HelpCommand.js");

// startup function
client.once("ready", () => {
    // send startup message
    utils.logMessage("ChristCentered Economy v1.0 is loading...");

    // set bot profile
    client.user.setStatus("online");
    client.user.setActivity("The Gospel.", {type: "LISTENING"});
    // loop setting the status message
    setInterval(() => { client.user.setActivity("The Gospel.", {type: "LISTENING"}); }, 5000 * 60);

    // send completion message
    utils.logMessage("ChristCentered Economy v1.0 has successfully loaded.");
});

// message listener
client.on("messageCreate", (msg) => {
    // if the message comes from a bot
    if (msg.author.bot) return;

    // if message was a DM
    if (!msg.guild) {
        utils.logMessage("Received a DM from " + msg.author.tag + ": " + msg.content);
        return;
    }

    // check if message was a command
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
        }

        if (commands.includes(command))
            utils.logMessage("[" + guild.name + "], " + username + " has run a command: " + command);
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
    interaction.channel.send({ embeds: [embed] });
});

// log in the bot
const token = utils.getToken();
client.login(token);