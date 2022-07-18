// require
const CustomEmbed = require(`${process.cwd()}/utils/CustomEmbed.js`);
const Utils = require(`${process.cwd()}/utils/Utils.js`);
const shop = require(`${process.cwd()}/shop.json`);

// classes
class Shop {
    // get an item by it's name or ID
    static getItem(item) {
        // variable for the returned item
        var returnItem = null;
        
        // check if the entered item is an item ID
        if (Number.isInteger(item)) {
            // convert to string
            const key = "" + item;

            returnItem = shop[key];
        } else {
            for (const key in shop) {
                // check if key is null
                if (!shop.hasOwnProperty(key)) return;

                // define the key name
                const keyName = shop[key].NAME.toUpperCase();

                // check if it's the proper key
                if (keyName === item.toUpperCase())
                    returnItem = shop[key];
            }
        }

        return returnItem;
    }

    // run the function of an item
    static runFunction(msg, item) {
        switch (item.FUNCTION.TYPE.toUpperCase()) {
            case "FOOD":
                // don't know what the functionality of this is
                break;
            case "ROLE":
                // get the role
                const roleID = item.FUNCTION.ROLEID;
                const role = msg.guild.roles.cache.find(r => r.id === roleID);

                // if the role is null, cancel
                if (!role) break;

                // create the user variable
                const user = msg.member;

                // give the user the role
                user.roles.add(role.id);
                break;
        }
    }
}

// export classes
module.exports = Shop;