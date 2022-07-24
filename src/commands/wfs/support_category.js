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
    async execute (client, db_handler, interaction) {
        try {
            if(functions.isAdmin(interaction.member)) {    
                let channel = interaction.options.getChannel('channel');
                if(channel != undefined) {
                    const update = await db_handler.update_row('GuildConfig', 'wfs_category_id', channel.id, 'guild_id', interaction.guild.id)
                    await client.GuildConfigs.set(interaction.guild.id, update.data)

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