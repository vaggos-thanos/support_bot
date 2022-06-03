const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'support_category',
    category: 'wfs',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the category for the support voice channels',
    data: new SlashCommandBuilder()
        .setName('support_category')
        .setDescription('Set the category for the support voice channels')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as the support category')
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
                        'wfs_category_id', 
                        channel.id, 
                        'GuildConfigs', 
                        (interaction.guild.id, [interaction.guild.id, guildConfig[1], guildConfig[2], guildConfig[3], guildConfig[4], guildConfig[5], channel.id]), 
                        'guild_id', 
                        interaction.guild.id
                    );
                    interaction.reply("wfs category set to " + channel).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            functions.log(`Error in command support_category: ${error}`, 'error');
        }
    }
}