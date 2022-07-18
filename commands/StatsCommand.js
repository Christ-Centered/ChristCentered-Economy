// require
const User = require(`${process.cwd()}/user/User.js`);
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);

const Utils = require(`${process.cwd()}/utils/Utils.js`);

// functions
const functions = {
    name: "stats",
    alias: ["coins"],
    Execute(msg, args) {
        // create embed
        const embed = new CustomEmbed(Utils.getDefaultEmbedOptions());

        // check if author has permission
        const authorProfile = new User(msg.author.id);

        var user;

        // check argument length
        if (args.length == 1) user = msg.mentions.members.first();
        else user = msg.author;

        // check if argument is a mention
        if (!user) {
            embed.args["description"] = "User must be a mention!";
            msg.channel.send({ embeds: [embed.get()] });
            return;
        }

        // create user profile
        const userProfile = new User(user.id);

        // check for initialization
        if (!userProfile.isInitialized())
            userProfile.initialize();

        embed.args["description"] = "(<@" + user.id + ">)"

        // get users coins
        const coins = userProfile.getCoins();
        const streak = userProfile.getStreak();
        const bankAccount = userProfile.getBankAccount();
        const netWorth = userProfile.getNetWorth();
        const items = userProfile.getItems();

        // create & send the message
        embed.args["fields"] = [
            {name: "Coins", value: "`" + coins + "` :coin:", inline: true},
            {name: "Streak", value: "`" + streak + "`", inline: true},
            {name: "Bank Account", value: "`" + bankAccount + "` :coin:", inline: true},
            {name: "Net Worth", value: "`" + netWorth + "` :coin:", inline: true},
            {name: "Items", value: "`Under Development`", inline: true},
        ];

        msg.channel.send({ embeds: [embed.get()] });
    }
}

// export functions
module.exports = functions;