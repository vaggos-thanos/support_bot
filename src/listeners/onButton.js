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
            console.log(`Button ${interaction.customId} was pressed by ${interaction.user.tag}`);
            await button.run(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "The buttons wasn't found", ephemeral: true });
        }
    }
}