require('dotenv').config();
require('./database/database')
global.functions = require('./utils/functions')
const Constants = require('discord.js/src/util/Constants.js');
Constants.DefaultOptions.ws.properties.$browser = `Discord Android` //or Discord iOS
const { eventHandler, CommandHandler } = require('./utils');
const { Client, Intents, Collection} = require('discord.js');
const client = new Client({
    fetchAllMembers: true,
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
});

(async () => {
    client.commands = new Collection();
    client.aliases = new Collection();

    client.GuildConfigs = new Collection();

    global.cmds = [];

    await eventHandler(client);
    await CommandHandler(client);

    client.login(process.env.token);

})();