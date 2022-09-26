require('dotenv').config();
const { Intents } = require("discord.js");
const Bot = require("./Classes/Bot.js");

const client = new Bot({
    intents: [
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.SlashCommandBuild("971378969020629012", "669886758091096095", 'local')