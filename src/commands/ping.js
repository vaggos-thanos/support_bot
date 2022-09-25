const { Command } = require("../Classes/Command");

module.exports = class TestCommand extends Command {
    constructor(client) {
        super('ping', 'Ping command', 0, false, '', '', '667357315950706704');
    }

    async run(interaction) {
        // interaction.reply('Test command works!');
    }
}