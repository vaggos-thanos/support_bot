const { ServerStatasService } = require("../Services/ServerStats.services");

module.exports = {
    name: 'ready',
    once: false,
    async execute(client, db_handler) {
        functions.log('Logged in as ' + client.user.tag);

        // set the bot's presence
        setInterval(async () => {
            const guilds = client.guilds.cache
            const usersCount = await guilds.reduce(async (total, guild) => {
                return await total + guild.memberCount;
            }, 0)
            
            const botUsers = await guilds.reduce(async (total, guild) => {
                await guild.members.fetch();
                const bots = await guild.members.cache.filter(member => member.user.bot).size;
                if(await total == 0) return bots;
                
                return await total + bots;
            }, 0)

            client.user.setActivity(`${client.guilds.cache.size} servers | ${usersCount - botUsers} users`, { type: 'WATCHING' });
        }, 10000);

        // initialize the discord stats service
        const serverStatasService = new ServerStatasService(client);
        serverStatasService.update_stats('746856547086499893');
    }
}