const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'help',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Help command',

    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Returns the commands list'),
    async execute (client, db_handler, interaction) {
        try {
            const embed = new MessageEmbed();
            embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
            for ([id, data] of client.commands) {
                if (id !== undefined && data.description !== undefined ) {
                    embed.addField(`➡️ Command: /${id}`, '`' + `-> ${data.description}` + '`')  
                }
            }
            embed.setColor('#fcba03')
            embed.setTimestamp()
            embed.setThumbnail(client.user.displayAvatarURL())

            interaction.reply({ embeds: [embed]})
        } catch (error) {
            console.log(error)
            functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}