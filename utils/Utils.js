// require
const fs = require("fs");

// functions
const functions = {
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

    getDefaultEmbedOptions: function() {
        // create default embed options
        const embed = {
            color: "AQUA",
            author: {
                name: "ChristCentered Economy",
                url: "",
                iconURL: "https://cdn.discordapp.com/attachments/758680334698414081/988454409912606750/CCLogo.gif"
            }
        }

        return embed;
    }
}

// export functions
module.exports = functions;