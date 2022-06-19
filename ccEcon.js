// require
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const utils = require("./utils/utils.js");

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

client.login("hidden");