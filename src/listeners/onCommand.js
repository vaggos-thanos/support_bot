const Event = require('../Classes/Event.js')

module.exports = class onCommand extends Event {
    constructor(client) {
        super('interactionCreate');
        this.client = client;
    }

    async run(interaction) {
        if (!interaction.isCommand()) return;
        let SubCommandName = null;
        if(interaction.options._subcommand != null) {
            this.client.subCommands.get(interaction.commandName).subCommands.forEach(subCommand => {
                const subCommandName = new subCommand(this.client)
                if(subCommandName.name == interaction.options._subcommand) {
                    SubCommandName = subCommandName 
    
                }    
            })
        }
        
        const command = SubCommandName == null ? this.client.commands.get(interaction.commandName) : SubCommandName;
        if (!command) return;

        try {
            let permissions = command.permissions != [''] || command.permissions != undefined ? command.permissions : null;
            let OnlyRoles = command.OnlyRoles != [''] || command.OnlyRoles != undefined ? command.OnlyRoles : null;
            let OnlyUsers = command.OnlyUsers != [''] || command.permissions != undefined ? command.OnlyUsers : null;
            let OnlyOwner = command.ownerOnly != undefined ? command.ownerOnly : false;
            if (await this.client.functions.isAuthor(interaction.member.id)) {
                permissions = null;
                OnlyRoles = null;
                OnlyUsers = null;
                OnlyOwner = false
            }

            if (OnlyOwner) {
                if (!this.client.functions.isAuthor(interaction.member.id)) {
                    return interaction.reply({
                        content: this.client.language.LangTranslate("no_perms", interaction.guildId),
                        ephemeral: true
                    });
                }
            }

            if (await this.client.Anti_mod.execute(interaction) && this.client.functions.isAuthor(interaction.member.id) == false) return;

            if (permissions != null) {
                for(const permission of permissions) {
                    if (!interaction.member.permissions.has(permission)) {
                        interaction.reply({content: this.client.language.LangTranslate("no_perms", interaction.guildId), ephemeral: true });
                        console.log(`${interaction.member.id} does not have permission to use this command!`);
                        return;
                    }
                }
            }

            if (OnlyRoles != null) {
                for(const role of OnlyRoles) {
                    if (!interaction.member.roles.resolve(role)) {
                        interaction.reply({content: this.client.language.LangTranslate("no_perms", interaction.guildId), ephemeral: true });
                        console.log(`${interaction.member.id} does not have permission to use this command!`);
                        return;
                    }
                }
            }

            if (OnlyUsers != null) {
                for(const user of OnlyUsers) {
                    if (interaction.member.id !== user) {
                        interaction.reply({content: this.client.language.LangTranslate("no_perms", interaction.guildId), ephemeral: true });
                        console.log(`${interaction.member.id} does not have permission to use this command!`);
                        return;
                    }
                }
            }
            await command.run(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: this.client.language.LangTranslate("error_on_command", interaction.guidlId), ephemeral: true });
        }
    }
}