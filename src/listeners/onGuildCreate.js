const Event = require('../Classes/Event');

module.exports = class onGuildCreate extends Event {
    constructor(client) {
        super('guildCreate', false);
        this.client = client;
    }

    async run(guild) {
        console.log(`Joined guild: ${guild.id}`);
        // console.log(this.client.SlashCommandBuild())
        await this.client.SlashCommandBuild(this.client.id, guild.id, 'local')
        await this.client.dbManager.create_row('GuildConfigs', 'guild_id', guild.id)
    }
}