const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'set_welcome_channel',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the welcome channel for the server',

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
                    'welcome_channel_id', 
                    channel.id, 
                    'GuildConfigs', 
                    (message.guild.id, [message.guild.id, guildConfig[1], guildConfig[2], channel.id, guildConfig[4], guildConfig[5], guildConfig[6]]), 
                    'guild_id', 
                    message.guild.id
                );
                message.reply("Welcome channel set to " + channel.name).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
            }
        }
    }
}