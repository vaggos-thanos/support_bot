require('dotenv').config();
const { Client, Collection, Intent } = require('discord.js');
const client = new Client({
    fetchAllMembers: true,
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
});

(async () => {
    
})();