const { MessageButton, MessageActionRow } = require('discord.js');

class Button {
    constructor(name) {
        this.name = name;
    }

    getButtonBuilder() {
        return new MessageButton()
            .setCustomId(this.name)
    }

    run(interaction, db) {}
}

class ButtonHandler extends Button {
    constructor(buttons) {
        for (const button of buttons) {
            super(button.name);
        }
    }

    getActionRowBuilder(buttonNames) {
        const builder = new MessageActionRow();

        for (const button of this.buttons) {
            if (buttonNames.includes(button.name)) {
                builder.addComponents(button.getButtonBuilder());
            }
        }

        return builder;
    }

}

module.exports = {
    Button,
    ButtonHandler
};