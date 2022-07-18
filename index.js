// require
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const keepAlive = require(`${process.cwd()}/server.js`);
const Utils = require(`${process.cwd()}/utils/Utils.js`);

const fs = require(`fs`);

// setup commands
const CommandManager = require(`${process.cwd()}/managers/CommandManager.js`);
const commandFiles = fs.readdirSync(`${process.cwd()}/commands/`).filter(file => file.endsWith(`.js`));
CommandManager.initializeCommands(commandFiles);

// setup listeners
const ListenerManager = require(`${process.cwd()}/managers/ListenerManager.js`);
const listenerFiles = fs.readdirSync(`${process.cwd()}/listeners/`).filter(file => file.endsWith(`.js`));
ListenerManager.initializeListeners(listenerFiles);

// setup listeners
const RunnableManager = require(`${process.cwd()}/managers/RunnableManager.js`);
const runnableFiles = fs.readdirSync(`${process.cwd()}/runnables/`).filter(file => file.endsWith(`.js`));
RunnableManager.initializeRunnables(runnableFiles);

// setup games
const GameManager = require(`${process.cwd()}/managers/GameManager.js`);
const gameFiles = fs.readdirSync(`${process.cwd()}/games/minigames/`).filter(file => file.endsWith(`.js`));
GameManager.initializeGames(gameFiles);

// startup function
client.once(`ready`, () => {
    // send startup message
    Utils.logMessage(`ChristCentered Economy v1.0 is loading...`);

    // set bot profile
    const presence = {
        status: `online`,
        activity: {
            type: `LISTENING`,
            name: `The Gospel.`
        }
    };

    client.user.setPresence(presence);

    // loop setting the status message
    setInterval(() => client.user.setPresence(presence), 5000 * 60);

    // run runnables
    RunnableManager.getRunnables().forEach((runnable) => runnable.Run(client));

    // send completion message
    Utils.logMessage(`ChristCentered Economy v1.0 has successfully loaded.`);
});

// command listener
client.on(`messageCreate`, (msg) => ListenerManager.getListener(`MessageListener`).Trigger(msg));

// game listener
client.on(`messageCreate`, (msg) => ListenerManager.getListener(`GameListener`).Trigger(msg));

// dropdown interaction listener
client.on(`interactionCreate`, async (interaction) => ListenerManager.getListener(`InteractionListener`).Trigger(interaction));

// log in the bot
client.login(process.env['token']);
keepAlive();