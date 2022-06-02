const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { readdirSync } = require('node:fs');
const token = process.env.token;
const fs = require('node:fs');
// Place your client and guild ids here

async function register(clientId, guildId, scope) {
    const commands = [];
    readdirSync('./src/commands/').forEach(dir => {
        const commandFiles = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));
    
        for (const file of commandFiles) {
          const command = require(`../commands/${dir}/${file}`);
          console.log(`${command.name} loaded`);
          commands.push(command.data.toJSON());
        }
    });

    const rest = new REST({ version: '9' }).setToken(token);
    console.log(`Registering slash commands for ${guildId}`);
    console.log(`Client ID: ${clientId}`);
    console.log(`Scope: ${scope}`);
    
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands [LOCAL].'))
    .catch(error => {
        console.log(`Error registering application commands: ${error}`)
    });

    
}

module.exports ={ 
    register
};