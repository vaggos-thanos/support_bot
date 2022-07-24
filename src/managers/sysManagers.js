const fs = require('fs');
const path = require('path');
const color = require('ansi-colors');
const { Collection } = require('discord.js');

class SYSManager {
    constructor(client, dbManager) {
        this.client = client,
        this.dbManager = dbManager,
        this.clientId = client.id
    }

    async Commands(dir, repeted) {
        if(repeted){
            dir = dir
        } else {
            dir = path.join(__dirname, dir)
        }

        let files = await fs.readdirSync(dir);
        for(const file of files) {
            const stat = await fs.lstatSync(path.join(dir, file));
            if (stat.isDirectory()) {
                this.Commands(path.join(dir, file), true)
            } else {
                if(file.endsWith(".js")) {
                    const cmdName = file.substring(0, file.indexOf(".js"));
                    try {
                        const cmdModule = require(path.join(dir, file));
                        if(checkCommandModule(cmdName, cmdModule)) {
                            this.client.commands.set(cmdName, cmdModule);                            
                            console.log(color.yellow('[SYSManager Command]') + ' Loaded command ' + cmdName);
                        }
                    }
                    catch(err) {
                        console.log(color.yellow('[SYSManager Command]') + ' Error while loading command ' + cmdName);
                        console.log(err);
                    }
                }
            }
        }
    }

    Events(dir, repeted) {
        if(repeted) {
            dir = dir
        } else {
            dir = path.join(__dirname, dir)
        }

        let files = fs.readdirSync(dir);
        for(const file of files) {
            const stat = fs.lstatSync(path.join(dir, file));
            if (stat.isDirectory()) {
                this.Events(path.join(dir, file), true)
            } else {
                if(file.endsWith('.js')) {
                    const eventName = file.substring(0, file.indexOf('.js'));

                    try {
                        const eventModule = require(path.join(dir, file));
                        if (eventModule.once) {
                            this.client.once(eventName, (...args) => eventModule.execute(this.client, this.dbManager, ...args));
                        } else {
                            this.client.on(eventName, (...args) => eventModule.execute(this.client, this.dbManager, ...args));
                        }
                    } catch (error) {
                        console.log(color.yellow('[SYSManager Event]') + ' Error while loading event ' + eventName);
                        console.log(error);
                    }
                }
            }
        }
    }

    async SlashBuild(guild_id, dir, scope) {
        console.log(this.client.user)
        const clientId = this.client.user ? this.client.user.id : this.clientId;

        const commands = [];
        const tempCommands = new Collection();
        const token = process.env.token;
        const { REST } = require('@discordjs/rest');
        const { Routes } = require('discord-api-types/v9');
        await findCommands(dir, false);


        async function findCommands(dir, repeted) {
            if(repeted){
                dir = dir
            } else {
                dir = path.join(__dirname, dir)
            }
            
            let files = await fs.readdirSync(dir);

            for(const file of files) {
                const stat = await fs.lstatSync(path.join(dir, file));
                if (stat.isDirectory()) {
                    findCommands(path.join(dir, file), true)
                } else {
                    if(file.endsWith(".js")) {
                        const cmdName = file.substring(0, file.indexOf(".js"));
                        try {
                            const cmdModule = require(path.join(dir, file));
                            if(checkCommandModule(cmdName, cmdModule)) {
                                await tempCommands.set(cmdName, cmdModule);   
                                console.log(tempCommands)                         
                                console.log(color.yellow('[SYSManager Slash Build Command]') + ' Loaded command ' + cmdName);
                            }
                        }
                        catch(err) {
                            console.log(color.yellow('[SYSManager Slash Build Command]') + ' Error while loading command ' + cmdName);
                            console.log(err);
                        }
                    }
                }
            }
        }

        for (const file of tempCommands) {
            console.log(file)
            console.log(color.yellow('[SYSManager Slash]') + ` ${file[0]} loaded`);
            commands.push(file[1].data.toJSON());
        }
        
        const rest = new REST({ version: '9' }).setToken(token);
        console.log(`Registering slash commands for ${guild_id}`);
        console.log(`Client ID: ${clientId}`);
        console.log(`Scope: ${scope}`);
        
        if(scope == 'local') {
            rest.put(Routes.applicationGuildCommands(clientId, guild_id), { body: commands })
            .then(() => console.log('Successfully registered application commands [LOCAL].'))
            .catch(error => {
                console.log(`Error registering application commands: ${error}`)
            });
        } else if(scope == 'global') {

        }
    }
}


function checkCommandModule(cmdName, cmdModule) {
    if(!cmdModule.hasOwnProperty('name'))
        throw new Error(`${cmdName} command module does not have property 'name'`);
    if(!cmdModule.hasOwnProperty('category'))
        throw new Error(`${cmdName} command module does not have property 'category`);
    if(!cmdModule.hasOwnProperty('runCommand'))
        throw new Error(`${cmdNamd} command module does not have property 'runCommand'`);
    if(!cmdModule.hasOwnProperty('cooldown'))
        throw new Error(`${cmdNamd} command module does not have property 'cooldown'`);
    if(!cmdModule.hasOwnProperty('description'))
        throw new Error(`${cmdNamd} command module does not have property 'description'`);
    if(!cmdModule.hasOwnProperty('data'))
        throw new Error(`${cmdNamd} command module does not have property 'data'`);
    if(!cmdModule.hasOwnProperty('execute'))
        throw new Error(`${cmdNamd} command module does not have property 'execute'`);    
    return true;
}

function checkProperties(cmdName, cmdModule) {
    if(typeof cmdModule.run !== 'function')
        throw new Error(`${cmdName} command: run is not a function`);
    if(typeof cmdModule.description !== 'string')
        throw new Error(`${cmdName} command: description is not a string`);
    if(!Array.isArray(cmdModule.aliases))
        throw new Error(`${cmdName} command: aliases is not an Array`);
    return true;
}

module.exports = SYSManager;
