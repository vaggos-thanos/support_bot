module.exports = {
    name: 'voiceStateUpdate',
    once: false,
    async execute(client, db_handler, oldMember, newMember) {
        try {
            const newUserChannel = newMember.channelId
            const oldUserChannel = oldMember.channelId
            const guild = oldMember.guild
            const members = guild.members.cache;
            const userID = newMember.id
            const guildConfig = await client.GuildConfigs.get(guild.id);
      
            Promise.all(members.map(async member => {
                if(userID === member.id){
                    functions.log('A user joined a voice channel');
                    const channel1 = guildConfig.wfs_channel_id
                    if(newUserChannel === channel1) {
                        await functions.sleep(800)
                        guild.channels.create(`📞${member.user.username} support⚡`, {
                            type: 'GUILD_VOICE',
                            permissionOverwrites: [{
                            id: guild.id,
                            allow: 'VIEW_CHANNEL',
                            deny: 'CONNECT'
                            }]
                        }).then(channel1 => {
                            client.voiceSessions.set(userID, channel1.id)
                            console.log(client.voiceSessions)
                            let category = guild.channels.cache.get(guildConfig.wfs_category_id)
                            if (!category) throw new Error("Category channel does not exist")
                            channel1.setParent(category.id)
                            member.voice.setChannel(channel1)
                        }).catch(console.error);
                    }
                    
                    const channelID = await client.voiceSessions.get(userID)
                    const userchannel = channelID ? await guild.channels.cache.get(channelID) : await guild.channels.cache.find(c => c.name === `📞${member.user.username} support⚡` )

                    if(userchannel == undefined) return;
                    if(oldUserChannel === userchannel.id && newUserChannel !== userchannel.id){
                        userchannel.delete();
                        console.log(`Deleted channel for ${member.user.username}`)
                    }
                    return;
                }
            }));
        } catch (error) {
            functions.log(error)
        }
    }
}