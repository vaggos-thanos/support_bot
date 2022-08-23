const Event = require('../Classes/Event.js')
const { Embeds } = require('../Classes/Embeds.js')

module.exports = class onCommand extends Event {
    constructor(client) {
        super('interactionCreate', false);
        this.client = client;
    }

    async run(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.client.commands.get(interaction.commandName) ? this.client.commands.get(interaction.commandName) : this.client.subCommands.get(interaction.commandName);

        if (!command) return;

        try {
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            const embed = new Embeds({description: 'An error occured while running the command.', footer: 'Copyright VK DEV LIMITED'}).error()
            await interaction.reply({ embeds: [embed], ephemeral: true });
        }
    }
}