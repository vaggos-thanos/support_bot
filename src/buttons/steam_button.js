const { Button } = require("../Classes/Button");

module.exports = class steam_button extends Button {
    constructor(client) {
        super("steam_button");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder()
        .setLabel('Steam')
        .setStyle('LINK')
        .setURL('https://steamcommunity.com/id/golld3n/')
        .setEmoji('986425215762440232')

        return builder;
    }

    async run(interaction) {

    }
}