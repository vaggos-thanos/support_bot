const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'ban',
    category: 'admin',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Ban a user',

    data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The user to ban')
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('reason')
        .setDescription('The reason for the ban')
        .setRequired(false)
    ),
    async execute (client, db_handler, interaction) {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');

            await interaction.guild.members.ban(user, {reason: reason});

            const embed = new MessageEmbed()
            .setTitle('You have been banned')
            .setDescription(`You have been banned from ${interaction.guild.name} for \n `+ "```" + `${reason}` + "```")
            .setColor('#ff0000')

            await user.send(embed);

            const embed2 = new MessageEmbed()
            .setTitle('User has been banned')
            .setDescription(`${user.tag} has been banned from ${interaction.guild.name} for \n `+ "```" + `${reason}` + "```")
            .setColor('#ff0000')

            await interaction.reply({ embed: embed2, ephemeral: true });
        } catch (error) {
            console.log(error)
            functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}