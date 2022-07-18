// require
const Utils = require("../utils/Utils.js");
const Config = require("../config/Config.js");
const CustomEmbed = require("../utils/CustomEmbed.js");

const CommandManager = require("../managers/CommandManager.js");

// functions
const functions = {
    name: "MessageListener",
    Trigger: function(msg) {
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

        if (!msg.content.startsWith(prefix)) return;

        // create command & arguments
        const args = msg.content.slice(1).trim().split(" ");
        const commandName = args.shift().toLowerCase();

        // create executor variables
        const guild = msg.guild;
        const username = msg.author.username;

        // get the command
        const command = CommandManager.getCommand(commandName);

        // check if command is null
        if (!command) return;

        // execute the command
        if (config.Disabled) {
            if (command.name !== "enable" && command.name !== "disable") {
                // create embed
                const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());
                embed.args["description"] = "(:x:) Bot is currently disabled";

                // send the embed
                msg.channel.send({ embeds: [embed.get()] });

                return;
            }
        }

        // execute the command
        command.Execute(msg, args);

        // log message to console
        if (CommandManager.getCommands().has(command.name))
            Utils.logMessage("[" + guild.name + "], " + username + " has run a command: " + commandName);
    }
}

// export functions
module.exports = functions;