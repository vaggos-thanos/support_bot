const { MessageButton, MessageActionRow } = require('discord.js');

class Button {
    constructor(name) {
        this.name = name;
    }

    getButtonBuilder() {
        return new MessageButton()
    }

    run(interaction) {}
}

module.exports = {
    Button,
};