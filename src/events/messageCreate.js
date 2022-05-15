const { isAdmin } = require("../utils/functions");

const anti_spam = []

module.exports = {
    name: 'messageCreate',
    once: false,

    async execute(client, message) {
        if (message.author.bot) return;
        if(functions.isAuthor(message.author.id) == false) return;

        const guildConfig = await client.GuildConfigs.get(message.guild.id);
        
        if(guildConfig == undefined) {
            await functions.createDB(client, 'GuildConfig', '(guild_id)', `('${guild.id}')`, 'GuildConfigs', (guild.id, [guild.id ,'!', null, null, null, null, null]));
        }

        await functions.sleep(200);

        const prefix = await client.GuildConfigs.get(message.guild.id)[1];

        if(message.mentions.users.first() != undefined) {
            if(message.mentions.users.first().bot) {
                if(message.mentions.users.first().id == client.user.id) {
                    message.reply(`Hello there I am ${client.user.username} and my prefix is `+ "`" + prefix + "`" )
                    functions.log("The bot was mentioned in a message by " + message.author.username + " in " + message.guild.name + " (" + message.guild.id + ")")
                    return;
                }
            }
        }

        
        if (message.content.startsWith(prefix)) {
            const [cmdName, ...cmdArgs] = message.content
                .slice(prefix.length)
                .trim()
                .split(/\s+/);
            const command = client.commands.get(cmdName);
            console.log(cmdName != 'support' && await functions.isAdmin(message.member) == false)
            if(cmdName != 'support' && await functions.isAdmin(message.member) == false) return functions.log("The user " + message.author.username + " in " + message.guild.name + " (" + message.guild.id + ") tried to use a command but is not an admin")
            console.log(cmdName, ' used in ', message.guild.name, ' by ', message.author.username)
            if (command) {
                if (command.cooldown == undefined) {
                    command.cooldown = 1
                }
                if (BlockThis(command.name, message.guild.id)){
                    functions.log(`The command [ ${command.name} ] has been triggered from [ Server_name: ${message.guild.name}, Server_id: ${message.guildId} ]`)
                    anti_spam.push({guild: message.guild.id, command: command.name, time: Math.floor((new Date().getTime()/1000.0)+command.cooldown)})
                    
                    if (command.runCommand == true) {
                        command.run(client, message, cmdArgs);
                    }else if(await functions.isAuthor(message.author.id) == true){
                        command.run(client, message, cmdArgs);
                    }
                }else{
                    message.reply(`**__You have to wait ${command.cooldown} seconds to do this action!__**`)
                }
            }
        }
    }
};

function BlockThis(command, guild_id) {
    for (let i=0; i < anti_spam.length; i++) {
        if (anti_spam[i].guild == guild_id && anti_spam[i].command == command) {
            if (anti_spam[i].time > Math.floor(new Date().getTime()/1000.0)) {
                return false
            }
        }
    }
    return true
}