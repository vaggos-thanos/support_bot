const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'set_welcome_role',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the welcome role for the server',
    data: new SlashCommandBuilder()
        .setName('set_welcome_role')
        .setDescription('Set the welcome role for the server')
        .addRoleOption(option =>
            option.setName('role')
                .setDescription('The role to set as the welcome role')
                .setRequired(true)
        ),
    async execute (client, db_handler, interaction) {

        try {
            if(functions.isAdmin(interaction.member)) {
                let role = interaction.options.getRole('role');
                if(role) {
                    const update = await db_handler.update_row('GuildConfig', 'role_id', role.id, 'guild_id', interaction.guild.id)
                    await client.GuildConfigs.set(interaction.guild.id, update.data)

                    interaction.reply("Welcome role set to " + role.name).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            functions.log(`Error in command set_welcome_role: ${error}`, 'error');
        }
    }
}