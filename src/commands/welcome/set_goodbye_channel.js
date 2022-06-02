const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'set_goodbye_channel',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the goodbye channel for the server',
    data: new SlashCommandBuilder()
        .setName('set_goodbye_channel')
        .setDescription('Set the goodbye channel for the server')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to set as the goodbye channel')
                .setRequired(true)
        ),
    async execute (client, interaction) {
        if(functions.isAdmin(interaction.member)) {
            let channel = interaction.options.getChannel('channel');
            const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
            if(channel) {
                functions.updateDB(
                    client, 
                    'GuildConfig', 
                    'goodbye_channel_id', 
                    channel.id, 
                    'GuildConfigs', 
                    (interaction.guild.id, [interaction.guild.id, guildConfig[1], guildConfig[2], guildConfig[3], guildConfig[4], channel.id, guildConfig[6]]),
                    'guild_id', 
                    interaction.guild.id
                );
                interaction.reply("Goodbye channel set to " + channel.name).then(msg => {
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 5000);
                });
            }
        }
    }
}