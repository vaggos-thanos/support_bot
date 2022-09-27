const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const { SubCommand } = require('../../Classes/Command');

module.exports = class verifySubCommand extends SubCommand {
    constructor(client) {
        super('verify', 'The Channel to send the verify message', 0, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addChannelOption(option =>
            option.setName('verify_channel')
                .setDescription('The Channel to send the verify message')
                .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        try {
            await interaction.deferReply({ephemeral: true})
            await interaction.guild.members.fetch();
            await interaction.guild.channels.fetch();

            let channel = interaction.options.getChannel('verify_channel');
            const vaggos = interaction.guild.members.cache.get('588416409407848457')

            const embed = new MessageEmbed();
            embed.setTitle('Verify')
            embed.setDescription(`**Κάνε verify ότι δεν είσαι bot πατώντας το παρακάτω button!**

            Αν το button **ΔΕΝ** εμφανίζεται βεβαιωθείτε ότι έχετε το latest discord version! Αν ακόμα δεν σας το δείχνει κάντε ένα restart το discord στο PC (CTRL +R) ή ένα restart to app στο κινητό (μπορεί να χρειαστεί και full restart το κινητό)
            
            Αν κάποιος συνεχίζει να έχει θέμα με το verify να στέλνει DM στον ${vaggos}.`)
            embed.setColor('#fcba03')
            embed.setThumbnail(this.client.user.displayAvatarURL())

            const verify_button = this.client.buttons.get('verify_button').getButtonBuilder();
            console.log(verify_button)            
            const row = await new MessageActionRow().addComponents(verify_button)

            await interaction.editReply({content: "You successfully created the verify message"})
            await channel.send({embeds: [embed], components: [row]})
        } catch (error) {
            this.client.functions.log(`Error in command verify: ${error}`, error);
        }
    }
}