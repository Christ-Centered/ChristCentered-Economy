// require
const { MessageEmbed } = require("discord.js");

// classes
class CustomEmbed {
    constructor(args) {
        this.args = args;
    }

    // this is called when the message is sent
    get() {
        const embed = new MessageEmbed();
        
        for (const key in this.args) {
            // make sure key isn't null
            if (!this.args.hasOwnProperty(key)) return;

            // set all properties
            if (key === "title") embed.setTitle(this.args[key]);
            if (key === "description") embed.setDescription(this.args[key]);
            if (key === "fields") embed.setFields(this.args[key]);
            if (key === "color") embed.setColor(this.args[key]);
            if (key === "author") embed.setAuthor(this.args[key]);
            if (key === "footer") embed.setFooter(this.args[key]);
            if (key === "image") embed.setImage(this.args[key]);
            if (key === "thumbnail") embed.setThumbnail(this.args[key]);
            if (key === "timestamp") embed.setTimestamp();
            if (key === "url") embed.setURL(this.args[key]);
        }

        // return the final embed
        return embed;
    }
}

// export classes
module.exports = CustomEmbed;