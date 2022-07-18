// require
const HelpDropdown = require(`${process.cwd()}/interactions/HelpDropdown.js`);
const ShopDropdown = require(`${process.cwd()}/interactions/ShopDropdown.js`);
const ClearLogsDropdown = require(`${process.cwd()}/interactions/ClearLogsDropdown.js`);
const ClearUserDropdown = require(`${process.cwd()}/interactions/ClearUserDropdown.js`);

// functions
const functions = {
    name: "InteractionListener",
    Trigger: function(interaction) {
        // make sure interaction is from a dropdown
        if (!interaction.isSelectMenu()) return;

        // define embed variable to send
        var embed;
        
        // define the selection
        const selection = interaction.values[0];

        // check which dropdown they clicked
        switch (interaction.customId) {
            case "help-dropdown":
                HelpDropdown.Interaction(interaction, selection);
                break;
            case "shop-dropdown":
                ShopDropdown.Interaction(interaction, selection);
                break;
            case "clearlogs-dropdown":
                ClearLogsDropdown.Interaction(interaction, selection);
                break;
            case "clearuser-dropdown":
                ClearUserDropdown.Interaction(interaction, selection);
                break;
        }
    }
}

// export functions
module.exports = functions;