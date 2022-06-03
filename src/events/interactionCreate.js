const anti_spam = []
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if(interaction.isCommand()) {
            if(functions.isAuthor(interaction.member) == false) return;
    
            const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
            const guild = interaction.guild;
            if(guildConfig == undefined) {
                await functions.createDB(client, 'GuildConfig', '(guild_id)', `('${guild.id}')`, 'GuildConfigs', (guild.id, [guild.id ,'!', null, null, null, null, null]));
            }
    
            await functions.sleep(200);

            const command = client.commands.get(interaction.commandName);
            const cooldown = 34;
            try {
                const cmdName = command.name
                if(cmdName != 'support' && await functions.isAdmin(interaction.member) == false) return functions.log("The user " + interaction.author.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an admin")
                if(cmdName == 'set_goodbye_channel' && await functions.isAdmin(interaction.member) == false) return
                if(cmdName == 'set_welcome_channel' && await functions.isAdmin(interaction.member) == false) return
                if(cmdName == 'set_welcome_role' && await functions.isAdmin(interaction.member) == false) return
                if(cmdName == 'support_category' && await functions.isAdmin(interaction.member) == false) return
                if(cmdName == 'wfs' && await functions.isAdmin(interaction.member) == false) return

                functions.log(`${interaction.member.user.tag} (${interaction.member.user.id}) used the command ${command.data.name}`)

                if (BlockThis(command.data.name, interaction.guild.id, interaction.member.user.id)){
                    functions.log(`The command [ ${command.data.name} ] has been triggered from [ Server_name: ${interaction.guild.name}, Server_id: ${interaction.guildId} ]`)
                    anti_spam.push({guild: interaction.guild.id, user: interaction.member.user.id, command: command.data.name, time: Math.floor((new Date().getTime()/1000.0)+ cooldown)})
                    
                    await command.execute(client, interaction);

                }else{
                    interaction.reply(`**__You have to wait ${cooldown} seconds to do this action!__**`)
                }
                
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        }
    }
}

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