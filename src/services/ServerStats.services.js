class ServerStatasService {
    constructor(client) {
        this.client = client;
    }

    async get_stats(guild) {
        try {
            await guild.members.fetch();
            const member_count = await guild.members.cache.filter(member => member.user.bot === false).size;
            const channel_count = await guild.channels.cache.size;
            const role_count = await guild.roles.cache.size;
            const boost_count = await guild.premiumSubscriptionCount;
            
            return {
                member_count,
                channel_count,
                role_count,
                boost_count
            }
        } catch (error) {
            this.client.functions.log(error, 'error')
        }   

    }
    
    async update_stats(guild_id) {
        try {
            const guild = this.client.guilds.cache.get(guild_id);
            const guildConfig = this.client.GuildConfigs.get(guild_id)
            if(!guildConfig) return;
            const member_C = guild.channels.cache.get(guildConfig.membersCID)
            const channel_C = guild.channels.cache.get(guildConfig.channelsCID)
            const role_C = guild.channels.cache.get(guildConfig.rolesCID)
            const boost_C = guild.channels.cache.get(guildConfig.boostsCID)
    
            if(!member_C || !channel_C || !role_C || !boost_C) return;

            const channels = {
                member_C,
                channel_C,
                role_C,
                boost_C,
            }
            const stats = await this.get_stats(guild)
            
            await update(this.client, channels, stats)
            this.client.functions.log(`Updated stats for ${guild.name}`)

            setInterval(async () => {
                const stats = await this.get_stats(guild)
                await update(this.client, channels, stats)
                
                this.client.functions.log(`Updated stats for ${guild.name}`)
            }, 1000 * 60 * 5)
        } catch (error) {
            this.client.functions.log(error, error)
        }

    }
}

async function update(client, data, stats){
    data.member_C.setName(client.language.LangTranslate('members', data.member_C.guild.id, [stats.member_count]))
    data.channel_C.setName(client.language.LangTranslate('channels', data.member_C.guild.id, [stats.channel_count]))
    data.role_C.setName(client.language.LangTranslate('roles', data.member_C.guild.id, [stats.role_count]))
    data.boost_C.setName(client.language.LangTranslate('boosts', data.member_C.guild.id, [stats.boost_count]))
}

module.exports = { ServerStatasService }