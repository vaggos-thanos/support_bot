const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'lock',
    category: 'admin',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Lock a channel',

    data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Lock a channel')
    .addChannelOption(option =>
        option.setName('channel')
        .setDescription('The channel to lock')
        .setRequired(false)
    ),
    async execute (client, db_handler, interaction) {
        try {
            const channel = interaction.options.getChannel('channel') ? interaction.options.getChannel('channel') : interaction.channel;
            const memberRole = interaction.guild.roles.cache.get('815650409833299978');

            if(!memberRole) throw new Error("Member role does not exist")
            // lock channel 
            channel.permissionOverwrites.edit(memberRole, {
                SEND_MESSAGES: false,
                CONNECT: false
            })

            const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('Channel has been locked')
            .setDescription(`${channel.name} has been locked by ${interaction.member.user.tag}`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error)
            functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}