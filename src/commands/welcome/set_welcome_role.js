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
    async execute (client, interaction) {

        try {
            if(functions.isAdmin(interaction.member)) {
                let role = interaction.options.getRole('role');
                const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                if(role) {
                    functions.updateDB(
                        client, 
                        'GuildConfig', 
                        'role_id', 
                        role.id, 
                        'GuildConfigs', 
                        (interaction.guild.id, [interaction.guild.id, guildConfig[1], guildConfig[2], guildConfig[3], role.id, guildConfig[5], guildConfig[6]]),
                        'guild_id', 
                        interaction.guild.id
                    );
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