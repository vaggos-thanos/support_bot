const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class unbanSubCommand extends SubCommand {
    constructor(client) {
        super('unban', 'Unban a user', 0, false, [], [
            "829852428164923392",
            "1000872316382752882",
            "966087756210122762", 
            "985666598792749106", 
            "970563614593413151", 
            "970175894167621723", 
            "956181908746817546", 
            "982314001797103737", 
            "815650011287126067"
        ]);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addStringOption(option =>
            option.setName('userid')
            .setDescription('The user to unban')
            .setRequired(true)
        )
        return builder;
    }
    
    async run(interaction) {
        try {
            const user = interaction.options.getString('userid');
            const isnum = /^\d+$/.test(user)
            const banned_user = isnum ? await interaction.guild.bans.fetch(user) : null;
 

            await interaction.guild.members.unban(banned_user);

            const embed = new MessageEmbed()
            .setColor('#00ff00')
            .setTitle('User has been unbanned')
            .setDescription(`${banned_user.tag} has been unbanned from ${interaction.guild.name}`)

            await interaction.reply({ embeds: [embed], ephemeral: true });
        } catch (error) {
            console.log(error)
            this.functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}