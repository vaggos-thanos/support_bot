const Event = require('../Classes/Event.js')

module.exports = class onCommand extends Event {
    constructor(client) {
        super('interactionCreate');
        this.client = client;
    }

    async run(interaction) {
        if (!interaction.isCommand()) return;

        const command = this.client.commands.get(interaction.commandName) ? this.client.commands.get(interaction.commandName) : this.client.subCommands.get(interaction.commandName);

        if (!command) return;

        try {
            const permissions = command.permissions != '' ? command.permissions : null;
            const OnlyRoles = command.OnlyRoles != '' ? command.OnlyRoles : null;
            const OnlyUsers = command.OnlyUsers != '' ? command.OnlyUsers : null;
            
            if (permissions != null) {
                for(const permission of permissions) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true });
                        console.log(`${interaction.member.id} does not have permission to use this command!`);
                        return;
                    }
                }
            }

            if (OnlyRoles != null) {
                for(const role of OnlyRoles) {
                    if (!interaction.member.roles.has(role)) {
                        interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true });
                        console.log(`${interaction.member.id} does not have permission to use this command!`);
                        return;
                    }
                }
            }

            if (OnlyUsers != null) {
                for(const user of OnlyUsers) {
                    if (interaction.member.id !== user) {
                        interaction.reply({content: 'You do not have permission to use this command!', ephemeral: true });
                        console.log(`${interaction.member.id} does not have permission to use this command!`);
                        return;
                    }
                }
            }
            console.log(`${interaction.member.id} used the ${interaction.commandName} command!`);
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: "An error was occered while runing this command", ephemeral: true });
        }
    }
}