const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'say',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Say something',
 
    data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Say something')
    .addStringOption(option => 
        option.setName('message')
        .setDescription('The message to say')
        .setRequired(true)
    ),
    async execute (client, db_handler, interaction) {
        try {
			await interaction.deferReply();

            const message = interaction.options.getString('message');

            if(functions.isAdmin(interaction.member)) {
                const embed = new MessageEmbed();
                embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
                embed.setDescription(message);
                embed.setColor('#fcba03')
                embed.setTimestamp()
                embed.setThumbnail(client.user.displayAvatarURL())
                interaction.editReply({ embeds: [embed]});
            }

        } catch (error) {
            console.error(error);
            functions.log(`Error in Command [say] in ${interaction.guild.name}`, error)
        }

    }
};