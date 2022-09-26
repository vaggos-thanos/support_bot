const { MessageEmbed } = require("discord.js");
const { SubCommand } = require("../../Classes/Command");

module.exports = class add_types extends SubCommand {
    constructor(client) {
        super('add_types', 'Add ticket types', 5, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder();
        builder.addStringOption(option => 
            option.setName('name')
                .setDescription('The name of the ticket type (add an emoji if you want to add one)')
                .setRequired(true)   
        );
        return builder;
    }

    async run(interaction) {
        try {
            if(true) return;
            const text = interaction.options.getString('name');
            const emojiRegex = /\p{Emoji}/u;
            console.log(text.match(emojiRegex))
            const emoji = text.match(emojiRegex) ? text.match(emojiRegex)[0] : '';
            const name = emoji ? text.replace(emoji, '').trim() : text;
            await this.client.ticket_service.addType(interaction.guild, name, emoji);
    
            //create an emebed to send to the user
            const embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle('Ticket Type Added')
                .setDescription(`${emoji} ${name}`)
    
            await interaction.reply({embeds: [embed], ephremeral: true});
        } catch (error) {
            console.log(error)
        }
    }
}