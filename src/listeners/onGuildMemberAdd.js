const { MessageEmbed } = require("discord.js");
const Event = require("../Classes/Event");

module.exports = class onGuildMemberAdd extends Event {
    constructor(client) {
        super('guidMemberAdd', false);
        this.client = client;
    }

    async run(member) {
        try {
            const guildConfig = await this.client.GuildConfigs.get(member.guild.id);
            const channel = member.guild.channels.cache.get(guildConfig.welcome_channel_id);
            
            const embed = new MessageEmbed()
            .setColor('#fcba03')
            .setDescription(this.client.language.LangTranslate("welcome_message", member.guildId, [`<@${member.id}>`]))
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp()
            .setImage('https://cdn-longterm.mee6.xyz/plugins/welcome/images/746856547086499893/4082029a18254e51899639eef1dcbd721225458ac8255317aa7af2bdf77e1c66.gif')
    
            channel.send({embeds: [embed] });    
        } catch (error) {
            functions.log('there was an error in the guildMemberAdd event: ' + error);
        }
    }
}