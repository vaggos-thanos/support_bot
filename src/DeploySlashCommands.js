require('dotenv').config();
const { Intents } = require("discord.js");
const Bot = require("./Classes/Bot.js");

const client = new Bot({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
})

client.SlashCommandBuild("971378969020629012", "669886758091096095", 'local')