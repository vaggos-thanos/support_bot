const { SubCommandHandler } = require("../../Classes/Command");
const set_avatar = require("./set_avatar");
// const set_description = require("./support");
const set_username = require("./set_username");


module.exports = class subcommand_handler extends SubCommandHandler {
    constructor(client) {
        super(client, "client_info", "Manage the bot's info",  5, true, [set_avatar, set_username]);
    }
}