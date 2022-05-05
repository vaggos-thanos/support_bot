module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  async execute (client, oldMember, newMember) {
    try {
      const newUserChannel = newMember.channelId
      const oldUserChannel = oldMember.channelId
      const guild = oldMember.guild
      const members = guild.members.cache;
      const userID = newMember.id
      const guildConfig = await client.GuildConfigs.get(guild.id);

      members.forEach(async member => {
        if(userID === member.id){
          const channel1 = guildConfig[2]
          if(newUserChannel === channel1) {
            guild.channels.create(`${member.user.username} support room`, {
              type: 'GUILD_VOICE',
              permissionOverwrites: [{
                id: guild.id,
                allow: 'VIEW_CHANNEL',
                deny: 'CONNECT'
              }]
            }).then(channel1 => {
              let category = guild.channels.cache.get(guildConfig[6])
              if (!category) throw new Error("Category channel does not exist")
              channel1.setParent(category.id)
              member.voice.setChannel(channel1)
            }).catch(console.error);
          }        
          const userchannel = await guild.channels.cache.find(c => c.name === `${member.user.username} support room` )
          if(userchannel === undefined) return;
          if(oldUserChannel === userchannel.id && newUserChannel !== userchannel.id){
            userchannel.delete();
          }
          return;
        }
      });
    } catch (error) {
      console.log(error)
    }
  }
}

function formatDate(date) {
  var hours = date.getHours();
  var mins  = date.getMinutes();
  var secs  = date.getSeconds();
  
  hours = (hours < 10 ? "0" : "") + hours;
  mins = (mins < 10 ? "0" : "") + mins;
  secs = (secs < 10 ? "0" : "") + secs;

  return `${hours}:${mins}:${secs}`;
}