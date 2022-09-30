const Event = require('../Classes/Event');

module.exports = class onReady extends Event {
    constructor(client) {
        super('ready', true);
        this.client = client;
    }

    async run() {
        this.client.functions.log('Logged in as ' + this.client.user.tag);

        // set the bot's presence
        setInterval(async () => {
            const guilds = this.client.guilds.cache
            const usersCount = await guilds.reduce(async (total, guild) => {
                return await total + guild.memberCount;
            }, 0)
            
            const botUsers = await guilds.reduce(async (total, guild) => {
                await guild.members.fetch();
                const bots = await guild.members.cache.filter(member => member.user.bot).size;
                if(await total == 0) return bots;
                
                return await total + bots;
            }, 0)

            this.client.user.setActivity(`${this.client.guilds.cache.size} servers | ${usersCount - botUsers} users`, { type: 'WATCHING' });
        }, 10000);
        
        this.client.ServerStatasService.update_stats('746856547086499893');
    }
}