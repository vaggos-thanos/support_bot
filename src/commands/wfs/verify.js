const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'verify',
    category: 'admin',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Verify a user',
    data: new SlashCommandBuilder()
        .setName('verify')
        .setDescription('Verify a user')
        .addChannelOption(option =>
            option.setName('verify_channel')
                .setDescription('The Channel to send the verify message')
                .setRequired(true)
        ),
    async execute (client, db_handler, interaction) {
        try {
            if(functions.isAdmin(interaction.member)) {
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
                embed.setThumbnail(client.user.displayAvatarURL())

                const verifyB = new MessageButton();
                verifyB.setCustomId('verify')
                verifyB.setLabel('Verify')
                verifyB.setStyle('SUCCESS')
                
                const row = await new MessageActionRow().addComponents(verifyB)

                await interaction.editReply({content: "You successfully created the verify message"})
                await channel.send({embeds: [embed], components: [row]})
            }
        } catch (error) {
            functions.log(`Error in command verify: ${error}`, 'error');
        }
    }
}