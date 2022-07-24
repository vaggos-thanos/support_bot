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
    async execute (client, db_handler, interaction) {
        try {
            if(functions.isAdmin(interaction.member)) {
                let channel = interaction.options.getChannel('channel');
                if(channel != undefined) {
                    const update = await db_handler.update_row('GuildConfig', 'wfs_channel_id', channel.id, 'guild_id', interaction.guild.id)
                    await client.GuildConfigs.set(interaction.guild.id, update.data)

                    interaction.reply("wfs channel set to " + channel).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            functions.log(`Error in command wfs: ${error}`);
        }
    }
}