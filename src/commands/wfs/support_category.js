const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'support_category',
    category: 'wfs',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the category for the support voice channels',

    run: async (client, message, args) => {
        if(functions.isAdmin(message.member)) {
			await message.guild.members.fetch();
			await message.guild.channels.fetch();

            let channel = args[0]
            let mention = message.mentions.channels.first();
            let mention1 = message.mentions.roles.first();
            let mention2 = message.mentions.users.first();
            let userid = message.guild.members.cache.get(channel);
            let isCategory = message.guild.channels.cache.get(channel);
          
            if(channel == undefined || mention != undefined || mention1 != undefined || mention2 != undefined || userid != undefined || isCategory == undefined || isCategory.type != 'GUILD_CATEGORY') {
                message.reply("Please use an id for the category").then(msg => {
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
                    'wfs_category_id', 
                    channel, 
                    'GuildConfigs', 
                    (message.guild.id, [message.guild.id, guildConfig[1], guildConfig[2], guildConfig[3], guildConfig[4], guildConfig[5], channel]), 
                    'guild_id', 
                    message.guild.id
                );
                message.reply("wfs category set to " + channel).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
            }
        }
    }
}