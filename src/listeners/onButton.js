const Event = require('../Classes/Event.js')

module.exports = class onCommand extends Event {
    constructor(client) {
        super('interactionCreate', false);
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