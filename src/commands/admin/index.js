const { SubCommandHandler } = require("../../Classes/Command");
const ban = require("./ban");
const kick = require("./kick");
const findban = require("./findban");
const lock = require("./lock");
const set_verified_role = require("./set_verified_role");
const set_welcome_channel = require("./set_welcome_channel");
const support_category = require("./support_category");
const unban = require("./unban");
const unlock = require("./unlock");
const verify = require("./verify");
const wfs = require("./wfs");


module.exports = class subcommand_handler extends SubCommandHandler {
    constructor(client) {
        super(client, "admin", "Manage the server",  5, true, [ban, findban, kick, lock, set_verified_role, set_welcome_channel, support_category, unban, unlock, verify, wfs]);
    }
}