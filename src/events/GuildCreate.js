module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client, guild) {
        functions.log(`Joined guild: ${guild.name} (id: ${guild.id})`);
        
        functions.createDB(client, 'GuildConfig', '(guild_id)', `('${guild.id}')`, 'GuildConfigs', (guild.id, [guild.id, '!', null, null, null, null, null]));
    }
}