const { SubCommandHandler } = require("../../Classes/Command");
const add_types = require('./add_types');

module.exports = class subcommand_handler extends SubCommandHandler {
    constructor(client) {
        super(client, "ticket", "Manage tickets",  5, false, [add_types]);
    }
}