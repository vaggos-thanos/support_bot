const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class set_verified_roleSubCommand extends SubCommand {
    constructor(client) {
        super("set_verified_role", "Set the member role for the server",  5, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addRoleOption(option =>
            option.setName('role')
            .setDescription('The role to set')
            .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        try {
            let role = interaction.options.getRole('role');
            if(role) {
                const update = await db_handler.update_row('GuildConfig', 'role_id', role.id, 'guild_id', interaction.guild.id)
                await this.client.GuildConfigs.set(interaction.guild.id, update.data)

                interaction.reply("Welcome role set to " + role.name).then(msg => {
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 5000);
                });
            }
        } catch (error) {
            this.client.functions.log(`Error in command set_welcome_role: ${error}`, 'error');
        }
    }
}