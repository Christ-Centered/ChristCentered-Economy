// require
const { Client, Intents, Collection } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const Utils = require("./utils/Utils.js");
const Config = require("./config/Config.js");

const fs = require("fs");

// setup commands
const CommandManager = require("./managers/CommandManager.js");
const commandFiles = fs.readdirSync("./commands/").filter(file => file.endsWith(".js"));
CommandManager.initializeCommands(commandFiles);

// setup listeners
const ListenerManager = require("./managers/ListenerManager.js");
const listenerFiles = fs.readdirSync("./listeners/").filter(file => file.endsWith(".js"));
ListenerManager.initializeListeners(listenerFiles);


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
client.on("messageCreate", (msg) => ListenerManager.getListeners().get("MessageListener").Trigger(msg));

// dropdown interaction listener
client.on("interactionCreate", async (interaction) => ListenerManager.getListeners().get("InteractionListener").Trigger(interaction));

// log in the bot
const token = Config.getConfig("config.json").Token;
client.login(token);

// variable tester
// client.on("message", (msg) => {
//
// })