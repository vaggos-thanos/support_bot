const { MessageEmbed } = require('discord.js');
module.exports = {
    name: 'guildMemberAdd',
    once: false,
    async execute(client, member) {
        //f(member.user.bot) return;

        const guildConfig = await client.GuildConfigs.get(member.guild.id);

        let myGuild = member.guild
        let channel = myGuild.channels.cache.get(guildConfig[3]);
        
       const embed = new MessageEmbed()
        .setColor('#fcba03')
        .setDescription(`👋Γεια <@${member.id}>, καλωσήρθες στο 👑𝐆𝐎𝐋𝐃𝟑𝐍'𝐒 𝐂𝐎𝐌𝐌𝐔𝐍𝐈𝐓𝐘✌, διάβασε τους κανόνες και προσπάθησε να τους εφαρμώσεις!`)
        .setThumbnail(client.user.displayAvatarURL())
        .setTimestamp()
        .setImage('https://cdn-longterm.mee6.xyz/plugins/welcome/images/746856547086499893/4082029a18254e51899639eef1dcbd721225458ac8255317aa7af2bdf77e1c66.gif')

        channel.send({embeds: [embed] });

        let welcomeRole = guildConfig[4];

        if(welcomeRole == undefined) return;
        member.roles.add(welcomeRole);
    }
};
