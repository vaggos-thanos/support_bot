const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class kickSubCommand extends SubCommand {
    constructor(client) {
        super('kick', 'Kick a member from the server', 0, false);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to kick')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for the kick')
            .setRequired(false)
        )
        return builder;
    }

    async run(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');

            await interaction.guild.members.kick(user, {reason: reason == null ? "There is no reason" : reason});

            const embed = new MessageEmbed()
            .setTitle('You have been kicked')
            .setDescription(`You have been kicked from ${interaction.guild.name} for \n `+ "```" + `${reason == null ? "There is no reason" : reason}` + "```")
            .setColor('#ff0000')

            const embed2 = new MessageEmbed()
            .setTitle('User has been kicked')
            .setDescription(`${user.tag} has been kicked from ${interaction.guild.name} for \n `+ "```" + `${reason == null ? "There is no reason" : reason}` + "```")
            .setColor('#ff0000')

            await interaction.reply({ embeds: [embed2], ephemeral: true });
            await user.send({embeds: [embed]})
        } catch (error) {
            console.log(error)
            this.functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}