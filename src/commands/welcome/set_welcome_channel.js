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
    async execute (client, interaction) {
        try {
            if(functions.isAdmin(interaction.member)) {
                let channel = interaction.options.getChannel('channel');
                const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                
                if(channel) {
                    functions.updateDB(
                        client, 
                        'GuildConfig', 
                        'welcome_channel_id', 
                        channel.id, 
                        'GuildConfigs', 
                        (interaction.guild.id, [interaction.guild.id, guildConfig[1], guildConfig[2], channel.id, guildConfig[4], guildConfig[5], guildConfig[6]]), 
                        'guild_id', 
                        interaction.guild.id
                    );
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