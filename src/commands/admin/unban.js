const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'unban',
    category: 'admin',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Unban a user',

    data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unban a user')
    .addUserOption(option =>
        option.setName('user')
        .setDescription('The user to unban')
        .setRequired(true)
    ),
    async execute (client, db_handler, interaction) {
        try {
            const user = interaction.options.getUser('user');

            await interaction.guild.members.unban(user);

            const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('User has been unbanned')
            .setDescription(`${user.tag} has been unbanned from ${interaction.guild.name}`)

            await interaction.reply({ embed: embed, ephemeral: true });
        } catch (error) {
            console.log(error)
            functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}