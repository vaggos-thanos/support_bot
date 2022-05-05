const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'set_goodbye_channel',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the goodbye channel for the server',

    run: async (client, message, args) => {
        if(functions.isAdmin(message.member)) {
            let channel = message.mentions.channels.first();
            if(channel == undefined) {
                message.reply("Please mention a channel!").then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
                return;
            }

            const guildConfig = await client.GuildConfigs.get(message.guild.id);
            if(channel) {
                functions.updateDB(
                    client, 
                    'GuildConfig', 
                    'goodbye_channel_id', 
                    channel.id, 
                    'GuildConfigs', 
                    (message.guild.id, [message.guild.id, guildConfig[1], guildConfig[2], guildConfig[3], guildConfig[4], channel.id, guildConfig[6]]),
                    'guild_id', 
                    message.guild.id
                );
                message.reply("Goodbye channel set to " + channel.name).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
            }
        }
    }
}