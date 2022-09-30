const Event = require('../Classes/Event');

module.exports = class onGuildDelete extends Event {
    constructor(client) {
        super('guildDelete', false);
        this.client = client;
    }

    async run(guild) {
        await this.client.functions.log('Bot leave guild: ' + guild.name);
        await this.client.dbManager.delete_row('GuildConfigs', 'guild_id', guild.id);
        await client.GuildConfigs.delete(guild.id);
    }
}