// require
const { Collection } = require("discord.js");

// collections
const collections = {
    clearUserCollection: new Collection(),
    cooldowns: new Collection(),
    games: []
}

// export collections
module.exports = collections;