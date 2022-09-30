const Event = require('../Classes/Event');

module.exports = class onGuildCreate extends Event {
    constructor(client) {
        super('guildCreate', false);
        this.client = client;
    }

    async run(guild) {
        await this.client.functions.log('Bot join guild: ' + guild.name);
        await this.client.SlashCommandBuild(this.client.user.id, guild.id, 'local');
        await this.client.dbManager.create_row('GuildConfigs', 'guild_id', guild.id)

        await this.client.GuildConfigs.set(guild.id, this.client.dbManager.get_row('GuildConfigs', 'guild_id', guild.id));
    }
}