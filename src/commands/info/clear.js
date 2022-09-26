const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class clearSubCommand extends SubCommand {
    constructor(client) {
        super('clear', 'Clear the chat', 5, false, [], [
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
        .addNumberOption(option => 
            option.setName('amount')
            .setDescription('Amount of messages to delete')
            .setRequired(true)
        );
        return builder;
    }

    async run(interaction) {
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