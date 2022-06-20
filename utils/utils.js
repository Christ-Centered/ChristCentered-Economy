// require
const { MessageEmbed } = require("discord.js");
const fs = require("fs");

const config = require("../config.json");

// functions
const functions = {
    // get the bot token
    getToken: function() {
        if (!config) {
            this.logMessage("(Error) Could not find config.json.");
            return;
        }

        if (!config.Token) {
            this.logMessage("(Error) Token value not found in config.json");
            return;
        }

        return config.Token;
    },

    getPrefix: function() {
        if (!config) {
            this.logMessage("(Error) Could not find config.json.");
            return;
        }

        if (!config.Prefix) {
            this.logMessage("(Error) Prefix value not found in config.json");
            return;
        }

        return config.Prefix;
    },

    getCommands: function() {
        if (!config) {
            this.logMessage("(Error) Could not find config.json.");
            return;
        }

        if (!config.Commands) {
            this.logMessage("(Error) Commands value not found in config.json");
            return;
        }

        return config.Commands;
    },

    // get the current time @ runtime
    getTime: function() {
        // variables
        const month = new Date().getMonth();
        const day = new Date().getDay();
        const year = new Date().getFullYear();

        const minute = new Date().getMinutes();
        const hour = new Date().getHours();

        return month + "/" + day + "/" + year + ", " + hour + ":" + minute;
    },

    // send a message to the console
    logMessage: function(msg) {
        // log the message to the console
        console.log("[ChristCentered Economy]: " + msg);

        // log the message to the log file
        try {
            // current state of the log file
            const currentSOF = fs.readFileSync("logs.txt");

            // the message(s) to be logged to the file
            const logs = currentSOF + "(" + this.getTime() + ") [ChristCentered Economy]: " + msg + "\n"; 

            // write to the log file
            fs.writeFileSync("logs.txt", logs, (err) => {
                if (err)
                    console.log("[ChristCentered Economy]: (Error) Error while writing to logs file. (Make sure name of file is 'logs.txt'.");
            });

        // if error (no log file found)
        } catch (err) {
            // send debug message
            console.log("[ChristCentered Economy]: (Error) Error reading logs file. Creating one for you now...");

            // adjust the log message
            const logs = "-- Logs: --\n" + "(" + this.getTime() + ") [ChristCentered Economy]: " + msg + "\n";

            // create the logs file 
            fs.writeFileSync("logs.txt", logs, (err) => {
                if (err)
                    console.log("[ChristCentered Economy]: (Error) Error creating new logs file. Create one manually.");
            });

            console.log("[ChristCentered Economy]: Logs file created successfully.");
        }
    },

    // create a custom embedded message
    customEmbed: function(args) {
        const embed = new MessageEmbed();
        
        for (const key in args) {
            // make sure key isn't null
            if (!args.hasOwnProperty(key)) return;

            // set all properties
            if (key === "title") embed.setTitle(args[key]);
            if (key === "description") embed.setDescription(args[key]);
            if (key === "fields") embed.setFields(args[key]);
            if (key === "color") embed.setColor(args[key]);
            if (key === "author") embed.setAuthor(args[key]);
            if (key === "footer") embed.setFooter(args[key]);
            if (key === "image") embed.setImage(args[key]);
            if (key === "thumbnail") embed.setThumbnail(args[key]);
            if (key === "timestamp") embed.setTimestamp();
            if (key === "url") embed.setURL(args[key]);
        }

        // return the final embed
        return embed;
    }
}

// export functions
module.exports = functions;