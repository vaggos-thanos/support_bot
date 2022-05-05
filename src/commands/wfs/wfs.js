const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'wfs',
    category: 'wfs',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the wfs channel for the server',

    run: async (client, message, args) => {
        if(functions.isAdmin(message.member)) {
			await message.guild.members.fetch();
			await message.guild.channels.fetch();

            let channel = args[0]
            let mention = message.mentions.channels.first();
            let mention1 = message.mentions.roles.first();
            let mention2 = message.mentions.users.first();
            let userid = message.guild.members.cache.get(channel);
            let isVoiceC = message.guild.channels.cache.get(channel);
          
            if(channel == undefined || mention != undefined || mention1 != undefined || mention2 != undefined || userid != undefined || isVoiceC == undefined || isVoiceC.type != 'GUILD_VOICE') {
                message.reply("Please use an id for the voice channel").then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
                return;
            }

            const guildConfig = await client.GuildConfigs.get(message.guild.id);
            if(channel != undefined) {
                functions.updateDB(
                    client, 
                    'GuildConfig', 
                    'wfs_channel_id', 
                    channel, 
                    'GuildConfigs', 
                    (message.guild.id, [message.guild.id, guildConfig[1], channel, guildConfig[3], guildConfig[4], guildConfig[5], guildConfig[6]]), 
                    'guild_id', 
                    message.guild.id
                );
                message.reply("wfs channel set to " + channel).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
            }
        }
    }
}