const { SubCommandHandler } = require("../../Classes/Command");
const clear = require("./clear");
const support = require("./support");
const ping = require("./ping");
const help = require("./help");
const member_stats = require('./member_stats');
const members = require('./members')
const roles = require('./roles')
const say = require('./say')

module.exports = class subcommand_handler extends SubCommandHandler {
    constructor(client) {
        super(client, "info", "Info commands",  5, false, [clear, help, member_stats, members, ping, roles, say, support]);
    }
}