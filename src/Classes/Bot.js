const { Client, Collection } = require("discord.js")
const fs = require("fs");
const path = require("path");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const db_handler = require("./dbManager");

class Bot extends Client {
    constructor(args) {
        super(args);

        this.commands = new Collection();
        this.subCommands = new Collection();
        this.buttons = new Collection();
        this.events = new Collection();
        this.GuildConfigs = new Collection();
        this.UsersConfigs = new Collection();
        this.Tickets = new Collection();
        this.TicketsConfigs = new Collection();
        this.voiceSessions = new Collection();
        this.dbManager = new db_handler(this);
    }

    async InitCommands(dir) {
        const commands = fs.readdirSync(path.join(__dirname, dir))
        for (const file of commands) {
            if(file.endsWith('.js')) {
                const CmdFile = await require(path.join(__dirname, dir, file))
                const command = new CmdFile(this)
                if(command.name !== file.split(".js")[0]) return console.log(`Command name mismatch: ${file} vs ${command.name}`)
                await this.commands.set(command.name, command)
                console.log(`Loaded command: ${file}`)
            } else if (fs.lstatSync(path.join(__dirname, dir, file)).isDirectory()) {
                this.InitSubCommands(path.join(dir, file))
            } else {
                console.log(`Ignored file: ${file}`)
            }
        }
    }

    InitSubCommands(dir) {
        const commands = fs.readdirSync(path.join(__dirname, dir))
        for (const file of commands) {
            if (file.endsWith('.js')) {
                if (file.split(".js")[0] == "index"){
                    const CmdFile = require(path.join(__dirname, dir, file))
                    const command = new CmdFile(this)
                    this.subCommands.set(command.name, command)
                    console.log(`Loaded SubCommandHandler: ${command.name}`)
                }
            } else if (fs.lstatSync(path.join(__dirname, dir, file)).isDirectory()) {
                this.InitSubCommands(path.join(dir, file))
            } else {
                console.log(`Ignored file: ${file}`)
            }
        }
    }

    async InitEvents(dir) {
        const events = fs.readdirSync(path.join(__dirname, dir))
        for (const file of events) {
            if(file.endsWith('.js')) {
                const CmdFile = await require(path.join(__dirname, dir, file))
                const event = new CmdFile(this)
                await this.events.set(event.name, event)
                if(event.once) {
                    this.once(event.name, (...args) => event.run(...args))
                } else {
                    this.on(event.name, (...args) => event.run(...args))
                }
                console.log(`Loaded listener: ${file}`)
            } else if (fs.lstatSync(path.join(__dirname, dir, file)).isDirectory()) {
                this.InitEvents(path.join(dir, file))
            } else {
                console.log(`Ignored file: ${file}`)
            }
        }
    }

    async SlashCommandBuild(ClientID, GuildID, scope) {
        const SlashCommands = [];

        await this.InitCommands('../commands');
        const commands = this.commands
        const subCommands = this.subCommands

        for (const [name, command] of commands) {
            await SlashCommands.push((command.getSlashCommandBuilder()).toJSON())
            console.log(`Slash Command is Ready for Build: ${name}`)
        }

        for ( const [name, subCommand] of subCommands) {
            const slashCommandBuilder = subCommand.getSlashCommandBuilder()
            await SlashCommands.push(slashCommandBuilder.toJSON())
            console.log(`Slash Command is Ready for Build: ${name}`)
        }

        // SlashCommands.forEach(cmd => {console.log(cmd.options)})
        console.log(`Registering slash commands for ${GuildID}`);
        console.log(`Client ID: ${ClientID}`);
        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        if(scope == "local") {
            rest.put(Routes.applicationGuildCommands(ClientID, GuildID), { body: SlashCommands })
            .then(() => console.log('Successfully registered application commands [LOCAL].'))
            .catch(error => {
                console.log(`Error registering application commands: ${error}`)
                console.log(error);
            });
        } else if (scope == "global") {
            rest.put(Routes.applicationCommands(ClientID), { body: SlashCommands })
            .then(() => console.log('Successfully registered application commands [GLOBAL].'))
            .catch(error => {
                console.log(`Error registering application commands: ${error}`)
            });
        }
    }

    async InitButtons(dir) {
        const buttons = fs.readdirSync(path.join(__dirname, dir))
        for (const file of buttons) {
            if(file.endsWith('.js')) {
                if (file.split(".js")[0] == "index"){
                    const CmdFile = require(path.join(__dirname, dir, file))
                    const button = new CmdFile(this)
                    this.buttons.set(button.name, button)
                    console.log(`Loaded ButtonHandler: ${button.name}`)
                }
            } else if (fs.lstatSync(path.join(__dirname, dir, file)).isDirectory()) {
                this.InitButtons(path.join(dir, file))
            } else {
                console.log(`Ignored file: ${file}`)
            }
        }
    }

    async Start(token) {
        await this.dbManager.login(process.env.db_host, process.env.db_user, process.env.db_password, process.env.db)
        await this.dbManager.init(['GuildConfigs', 'UsersConfigs', 'Tickets', 'TicketsConfigs'], [this.GuildConfigs, this.UsersConfigs, this.Tickets, this.TicketsConfigs]);
        await this.InitCommands('../commands');
        await this.InitEvents('../listeners');
        await this.InitButtons('../buttons');
        await super.login(token);
    }
}

module.exports = Bot;