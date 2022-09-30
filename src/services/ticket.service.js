const { Collection } = require("discord.js");

class ticket_service {
    constructor(client) {
        this.client = client;
    }

    async addType(guild, name, emoji) {
        const types = [];
        const Types = await this.client.dbManager.get_row('TicketsConfigs', 'guild_id', guild.id);
        const type = {
            name: name,
            emoji: emoji
        }
        await types.push(type)
        console.log(Types)
        if(Types != undefined) {
            for(const TYPE of JSON.parse(Types.tickets_types)) {
                if(TYPE.name == type.name) return;
                types.push(TYPE);
            }
            const types_string = JSON.stringify(types)
            console.log(types_string)
            console.log(guild.id)
            await this.client.dbManager.update_row('TicketsConfigs', 'tickets_types', types_string, 'guild_id', guild.id);
        } else {
            const typessss = "'" + JSON.stringify(types) + "'";
            await this.client.dbManager.create_row('TicketsConfigs', 'guild_id, tickets_types', `${guild.id}, ${typessss}`);
        }

    }
}

module.exports = ticket_service;