const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'wfs',
    category: 'wfs',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the wfs channel for the server',
    data: new SlashCommandBuilder()
        .setName('wfs')
        .setDescription('Set the wfs channel for the server')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as the wfs channel')
                .setRequired(true)
        ),
    async execute (client, interaction) {
        try {
            if(functions.isAdmin(interaction.member)) {
                await interaction.guild.members.fetch();
                await interaction.guild.channels.fetch();
    
                let channel = interaction.options.getChannel('channel');
                const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                if(channel != undefined) {
                    functions.updateDB(
                        client, 
                        'GuildConfig', 
                        'wfs_channel_id', 
                        channel.id, 
                        'GuildConfigs', 
                        (interaction.guild.id, [interaction.guild.id, guildConfig[1], channel.id, guildConfig[3], guildConfig[4], guildConfig[5], guildConfig[6]]), 
                        'guild_id', 
                        interaction.guild.id
                    );
                    interaction.reply("wfs channel set to " + channel).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            functions.log(`Error in command wfs: ${error}`, 'error');
        }
    }
}