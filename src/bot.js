require('dotenv').config();
const mysql = require('mysql2')
const dbManager = require('./managers/dbManager')
const SYSManager = require('./managers/sysManagers')
const Functions = require("./utils/functions")
global.functions = new Functions();
const { Client, Collection, Intents } = require('discord.js');
const client = new Client({
    fetchAllMembers: true,
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
});

(async () => {
    const db_handler = new dbManager(mysql);
    const system = new SYSManager(client, db_handler);
    await db_handler.login(process.env.db_host, process.env.db_user, process.env.db_password, process.env.db);

    client.commands = new Collection();
    client.GuildConfigs = new Collection();
    client.UsersConfigs = new Collection();
    client.Tickets = new Collection();
    client.TicketsConfigs = new Collection();

    await system.init(['GuildConfigs', 'UsersConfigs', 'Tickets', 'TicketsConfigs'], [client.GuildConfigs, client.UsersConfigs, client.Tickets, client.TicketsConfigs]);
    await system.Commands('../commands');
    await system.Events('../events');

    await client.login(process.env.token);
    //await system.SlashBuild('746856547086499893', 'local')
})();