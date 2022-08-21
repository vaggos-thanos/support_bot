module.exports = {
    name: 'guildDelete',
    once: false,
    async execute(client, db_handler, guild) {
        try {
            functions.log('Bot leave guild: ' + guild.name);

            db_handler.delete_row('GuildConfigs', 'guild_id', guild.id)
            await client.GuildConfigs.delete(guild.id);
    
        } catch (error) {
            functions.log(error)            
        }
    }
}