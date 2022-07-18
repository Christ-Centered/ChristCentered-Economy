// require
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const Utils = require(`${process.cwd()}/utils/Utils.js`);

// functions
const functions = {
    name: "economy-info",
    alias: ["econinfo", "econ-info", "economyinfo", "einfo", "e-info"],
    Execute(msg, args) {
        // create the embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        embed.args["fields"] = [
            {name: ":dollar: Currency", value: "CC Coin :coin:", inline: false},
            {name: ":moneybag: Daily Claim", value: "You can claim **once a day** using the `!daily` command, and the reward can vary from **50** :coin: to **120** :coin:.\nClaim on consecutive days to earn a streak bonus (**4x** for **7 days** in a **row**).", inline: false},
            {name: ":slot_machine: Gamble", value: "You can gamble up to **5,000** :coin: for each game.", inline: false},
        ];

        // send the embed
        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;