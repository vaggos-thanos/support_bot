require('dotenv').config();
const Bot = require("./Classes/Bot.js");
const { Intents } = require("discord.js");

const client = new Bot({
    ws: { 
        properties: { 
            $browser: "Discord iOS" 
        }
    },
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
});

client.Start(process.env.TOKEN);