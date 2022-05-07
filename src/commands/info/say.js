const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'say',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Say something',

    run: async (client, message, args) => { 
        try {
            message.delete();
            if(functions.isAdmin(message.member)) {
                const embed = new MessageEmbed();
                embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
                embed.setDescription(args.join(" "));
                embed.setColor('#fcba03')
                embed.setTimestamp()
                embed.setThumbnail(client.user.displayAvatarURL())
                message.channel.send({ embeds: [embed]});
            }

        } catch (error) {
            functions.log(`Error in Command [say] in ${message.guild.name}`, error)
        }

	},
};