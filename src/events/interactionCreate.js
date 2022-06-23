const { MessageActionRow, MessageButton } = require("discord.js");

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
            const cooldown = 5;
            try {
                const cmdName = command.name
                console.log(await functions.isOwner(interaction.member, client))
                if(cmdName == 'set_goodbye_channel' && await functions.isOwner(interaction.member, client) == false) return functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an founder")
                if(cmdName == 'set_welcome_channel' && await functions.isOwner(interaction.member, client) == false) return functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an founder")
                if(cmdName == 'set_welcome_role' && await functions.isOwner(interaction.member, client) == false) return functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an founder")
                if(cmdName == 'support_category' && await functions.isOwner(interaction.member, client) == false) return functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an founder")
                if(cmdName == 'wfs' && await functions.isOwner(interaction.member, client) == false) return functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an founder")

                if(cmdName == 'support' || cmdName == 'help' || cmdName == 'ping' || cmdName == 'roles' || cmdName == 'members') {

                } else {
                    if(await functions.isAdmin(interaction.member, client) == false) {
                        functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an admin")
                        return;
                    }
                }

                functions.log(`${interaction.member.user.tag} (${interaction.member.user.id}) used the command ${command.data.name}`)

                if (BlockThis(command.data.name, interaction.guild.id, interaction.member.user.id)){
                    functions.log(`The command [ ${command.data.name} ] has been triggered from [ Server_name: ${interaction.guild.name}, Server_id: ${interaction.guildId} ]`)
                    anti_spam.push({guild: interaction.guild.id, user: interaction.member.user.id, command: command.data.name, time: Math.floor((new Date().getTime()/1000.0)+ cooldown)})
                    
                    await command.execute(client, interaction);

                }else{
                    interaction.reply({content: `**__Πρέπει να περιμένεις ${cooldown} δευτερόλεπτα για να κάνετε αυτήν την ενέργεια!__**`, ephemeral: true})
                }
                
            } catch (error) {
                console.error(error);
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }

        } else if (interaction.isButton()) {
            const button = interaction
            if(button.customId == 'verify') {
                await interaction.guild.roles.fetch();
                const memberRole = interaction.guild.roles.cache.get('815650409833299978')
                const user = button.member
                const msg = `Έγινες με επιτυχία verify! Διάβασε τα <@&815655146058940447> του server. Μπορεί να υπάρχει καθυστέρηση μέχρι και 1 λεπτό για να πάρεις το member role!`

                const row = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                        .setLabel('YouTube')
                        .setStyle('LINK')
                        .setURL('https://www.youtube.com/channel/UCYxF6-G6lCqTwRc0d14RHIg'),
                        
                        new MessageButton()
                        .setLabel('Steam')
                        .setStyle('LINK')
                        .setURL('https://steamcommunity.com'),
                    )
                await user.roles.add(memberRole)
                button.reply({content: msg, components: [row], ephemeral: true})
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