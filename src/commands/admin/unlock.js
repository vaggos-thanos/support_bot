const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'unlock',
    category: 'admin',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Unlock a channel',

    data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Unlock a channel')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('The channel to unlock')
        .setRequired(false)
    ),
    async execute (client, db_handler, interaction) {
        try {
            const channel = interaction.options.getChannel('channel') ? interaction.options.getChannel('channel') : interaction.channel;
            const memberRole = interaction.guild.roles.cache.get('815650409833299978');

            if(!memberRole) throw new Error("Member role does not exist")
            // unlock channel
            channel.permissionOverwrites.edit(memberRole, {
                SEND_MESSAGES: true,
                CONNECT: true
            })


            const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Channel has been unlocked')
            .setDescription(`${channel.name} has been unlocked by ${interaction.member.user.tag}`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error)
            functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}