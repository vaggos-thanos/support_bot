const Event = require('../Classes/Event.js')

module.exports = class onButton extends Event {
    constructor(client) {
        super('interactionCreate');
        this.client = client;
    }

    async run(interaction) {
        if (!interaction.isButton()) return;

        const button = this.client.buttons.get(interaction.customId);

        if (!button) return;

        try {
            await button.run(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}