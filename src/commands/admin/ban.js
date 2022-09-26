const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class banSubCommand extends SubCommand {
    constructor(client) {
        super('ban', 'Ban a member', 0, false);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addUserOption(option =>
            option.setName('user')
            .setDescription('The user to ban')
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reason')
            .setDescription('The reason for the ban')
            .setRequired(false)
        )
        return builder;
    }

    async run(interaction) {
        try {
            const user = interaction.options.getUser('user');
            const reason = interaction.options.getString('reason');

            await interaction.guild.members.ban(user, {reason: reason == null ? "There is no reason" : reason});

            const embed = new MessageEmbed()
            .setTitle('You have been banned')
            .setDescription(`You have been banned from ${interaction.guild.name} for \n `+ "```" + `${reason == null ? "There is no reason" : reason}` + "```")
            .setColor('#ff0000')


            const embed2 = new MessageEmbed()
            .setTitle('User has been banned')
            .setDescription(`${user.tag} has been banned from ${interaction.guild.name} for \n `+ "```" + `${rereason == null ? "There is no reason" : reasonason}` + "```")
            .setColor('#ff0000')

            await interaction.reply({ embeds: [embed2], ephemeral: true });

            await user.send({embeds: [embed]})
            
        } catch (error) {
            console.log(error)
            this.functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}