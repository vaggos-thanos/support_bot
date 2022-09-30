const { Command } = require("../Classes/Command");

module.exports = class TestCommand extends Command {
    constructor(client) {
        super('test', 'Test command', 0, false);
    }

    async run(interaction) {
        interaction.reply('Test command works!');
    }
}