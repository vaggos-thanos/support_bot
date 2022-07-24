const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'set_welcome_channel',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the welcome channel for the server',
    data: new SlashCommandBuilder()
        .setName('set_welcome_channel')
        .setDescription('Set the welcome channel for the server')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to set as the welcome channel')
                .setRequired(true)
        ),
    async execute (client, db_handler, interaction) {
        try {
            if(functions.isAdmin(interaction.member)) {
                let channel = interaction.options.getChannel('channel');
                const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                
                if(channel) {

                    const update = await db_handler.update_row('GuildConfig', 'welcome_channel_id', channel.id, 'guild_id', interaction.guild.id)
                    await client.GuildConfigs.set(interaction.guild.id, update.data)

                    interaction.reply("Welcome channel set to " + channel.name).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            functions.log(`Error in command set_welcome_channel: ${error}`, 'error');
        }
    }
}