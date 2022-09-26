const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class saySubCommand extends SubCommand{
    constructor(client) {
        super('say', 'Say something', 0, false, [], [
            "963897569656860672",
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
            option.setName('message')
            .setDescription('The message to say')
            .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        try {
			await interaction.deferReply();

            const message = interaction.options.getString('message');

            if(this.functions.isAdmin(interaction.member)) {
                const embed = new MessageEmbed();
                embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
                embed.setDescription(message);
                embed.setColor('#fcba03')
                embed.setTimestamp()
                embed.setThumbnail(this.client.user.displayAvatarURL())
                interaction.editReply({ embeds: [embed]});
            }

        } catch (error) {
            console.error(error);
            this.functions.log(`Error in Command [say] in ${interaction.guild.name}`, error)
        }

    }
};