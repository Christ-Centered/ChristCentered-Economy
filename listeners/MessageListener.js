// require
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const CommandManager = require(`${process.cwd()}/managers/CommandManager.js`);
const config = require(`${process.cwd()}/config.json`);

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
            if (msg.author.id !== "350718252076367874") {
              
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