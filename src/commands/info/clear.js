const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'clear',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Clear the chat',

    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear the chat')
    .addNumberOption(option => 
        option.setName('amount')
        .setDescription('Amount of messages to delete')
        .setRequired(true)
    ),
    async execute (client, db_handler, interaction) {
        const count = interaction.options.getNumber('amount');
        if(count[0] > 100) {
            return message.reply(`Τα μεγαλύτερα μηνύματα που μπορώ να διαγράψω είναι 100 αλλα προσπαθήσατε να διαγράψετε ` + '`' + count[0] + '`')
        }
        await interaction.channel.bulkDelete(parseInt(count), true).then(async (msg) => {
            interaction.reply(`**Το bot διαγράψε \`${msg.size}\` μηνύματα :broom:**`)
            setTimeout(async () => {
                await interaction.deleteReply();
            }, 5000);
        })
    }
}