const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class helpSubCommand extends SubCommand {
    constructor(client) {
        super('help', 'Help command', 0, false);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder();
        return builder;
    }
    
    async run(interaction) {
        try {
            const embed = new MessageEmbed();
            embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
            for (const [id, data] of this.client.commands) {
                if (id !== undefined && data.description !== undefined ) {
                    embed.addField(`➡️ Command: /${id}`, '`' + `-> ${data.description}` + '`')  
                }
            }
            embed.setColor('#fcba03')
            embed.setTimestamp()
            embed.setThumbnail(this.client.user.displayAvatarURL())

            interaction.reply({ embeds: [embed] })
        } catch (error) {
            console.log(error)
            this.client.functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}