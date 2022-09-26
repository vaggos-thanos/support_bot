const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class unlockSubCommand extends SubCommand {
    constructor(client) {
        super('unlock', 'Unlock the channel', 0, false, [], [
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
        .addChannelOption(option =>
            option.setName('channel')
            .setDescription('The channel to unlock')
            .setRequired(false)
        );
        return builder;
    }

    async run(interaction) {
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
            this.functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}