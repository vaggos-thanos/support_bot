module.exports = {
    name: 'guildDelete',
    once: false,
    execute(client, guild) {
        console.log(`Left guild: ${guild.name} (id: ${guild.id})`);

        functions.deleteDB(client, 'GuildConfig', guild.id ,'GuildConfigs');
    }
}