module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        setInterval(() => {
            client.user.setActivity(`!help | ${client.guilds.cache.size} servers`, { type: 'WATCHING' });
        }, 10000);

        database.query('SELECT * FROM GuildConfig', (err, result) => {
            if (err) {
                console.log(err);
            }else{
                if (result) {
                    for (let i = 0; i < result.length; i++) {
                        client.GuildConfigs.set(result[i].guild_id, [result[i].guild_id, result[i].prefix, result[i].wfs_channel_id, result[i].welcome_channel_id, result[i].role_id, result[i].goodbye_channel_id, result[i].wfs_category_id]);  
                    } 

                    const Guilds = client.guilds.cache.map(guild => guild.id);
                    for (let i = 0; i < Guilds.length; i++){
                        if (client.GuildConfigs.get(Guilds[i]) === undefined){
                            database.query(`INSERT IGNORE INTO GuildConfig (guild_id) VALUES (${Guilds[i]})`, (err, result) => {
                                if (err) {
                                    console.log(err);
                                }else{
                                    client.GuildConfigs.set(Guilds[i], [Guilds[i], '!', null, null, null, null, null]);
                                }
                            });
                        }
                    }
                }
            }
        });
    }
}
