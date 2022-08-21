module.exports = {
    name: 'guildCreate',
    once: false,
    async execute(client, db_handler, guild) {
        try {
            functions.log('Bot join guild: ' + guild.name);

            db_handler.create_row('GuildConfigs', 'guild_id', guild.id)
    
            const json = {
                guild_id: guild.id,
                wfs_channel_id: null,
                welcome_channel_id: null,
                role_id: null,
                goodbye_channel_id: null,
                wfs_category_id: null
            }
    
            await client.GuildConfigs.set(guild.id, json);
        } catch (error) {
            functions.log(error)
        }
    }  
}