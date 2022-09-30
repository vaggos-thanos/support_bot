const { Button } = require("../Classes/Button");

module.exports = class youtub_button extends Button {
    constructor(client) {
        super("youtub_button");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder()
        .setLabel('YouTube')
        .setStyle('LINK')
        .setURL('https://www.youtube.com/channel/UCYxF6-G6lCqTwRc0d14RHIg')
        .setEmoji('986425030164512808')
        
        return builder;
    }

    async run(interaction) {

    }
}