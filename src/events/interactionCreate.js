const { MessageActionRow, MessageButton } = require("discord.js");

const anti_spam = []
let executed = null
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, db_handler, interaction) {
        try {
            if(interaction.isCommand()) {
                try {
                    const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                    if(guildConfig == null) {
                        db_handler.create_row('GuildConfigs', 'guild_id', interaction.guild.id)
        
                        const json = {
                            guild_id: guild.id,
                            wfs_channel_id: null,
                            welcome_channel_id: null,
                            role_id: null,
                            goodbye_channel_id: null,
                            wfs_category_id: null
                        }
        
                        client.GuildConfigs.set(guild.id, json);
                        functions.log(`Error in command interactionCreate: guildConfig is null`);
                        interaction.reply({content: "There was an error in the bot. Please try to resend the command. If it throws the same error try to cotact the bot owner.", ephemeral: true});
                        return;
                    }
                    const command = await client.commands.get(interaction.commandName);
                    const cooldown = 5;
                
                    const isFounderCheckArray = [
                        "set_welcome_channel",
                        "set_verified_role",
                        "support_category",
                        "wfs",
                        "set_avatar",
                        "set_username",
                        "verify"
                    ]
    
                    const isAdminCmds = [
                        "roles",
                        "say",
                        "member_stats"
                    ]
    
                    const isHeadAdminCmds = [
                        "clear",
                        "ban",
                        "kick",
                        "findban",
                        "unban"
                    ]
    
                    const normalCmds = [
                        "support",
                        "help",
                        "ping",
                        "members"
                    ]
    
                    const isFounder = await isFounderCheckArray.reduce(async (bool, cmd) => {
                        return await bool || interaction.commandName == cmd
                    }, false);

                    const isHeadAdmin = await isHeadAdminCmds.reduce(async (bool, cmd) => {
                        return await bool || interaction.commandName == cmd
                    }, false);
                    
                    const isAdmin = await isAdminCmds.reduce(async (bool, cmd) => {
                        const isadmin = await interaction.member.roles.cache.has("963897569656860672")
                        return await bool || isadmin && interaction.commandName == cmd
                    }, false);
    
                    const shouldPass = await normalCmds.reduce(async (bool, cmd) => {
                        const isHeadAdmin = await interaction.member.roles.cache.has("829852428164923392")
                        return await bool || isHeadAdmin && interaction.commandName == cmd
                    }, false)
    
                    if(!(await functions.isAuthor(interaction.member.id))) {
                        if(isFounder) {
                            const isOwner = await functions.isOwner(interaction.member, client)
                            if(!isOwner) return interaction.reply({content: "Only the owner of the server can use this command and you are NO owner.", ephemeral: true})
                        }
    
                        if (!shouldPass) {
                            if(!isHeadAdmin) {
                                if(!isAdmin) {
                                    if(!(await functions.isAdmin(interaction.member, client))) {
                                        functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an admin")
                                        if(interaction.commandName == 'set_username' || interaction.commandName == 'set_avatar') {
                                            if(executed == null) {
                                                executed = new Date()
                                            } else if( (new Date() - executed) < 60000 * 20) {
                                                return interaction.reply({content: "You are not allowed to use this command. You can use it only once every 20 minutes.", ephemeral: true})
                                            }
                                        }
                                        return interaction.reply({content: "You are not head admin. You are not allowed to use this command.", ephemeral: true});
                                    }
                                }
                            } 
                        }
                    }
                    if (BlockThis(command.data.name, interaction.guild.id, interaction.member.user.id)){
                        functions.log(`The command [ ${command.name} ] has been triggered from [ Server_name: ${interaction.guild.name}, Server_id: ${interaction.guildId} ]`)
                        anti_spam.push({guild: interaction.guild.id, user: interaction.member.user.id, command: command.data.name, time: Math.floor((new Date().getTime()/1000.0)+ cooldown)})
                        
                        await command.execute(client, db_handler, interaction);
    
                    } else {
                        interaction.reply({content: `**__Πρέπει να περιμένεις ${cooldown} δευτερόλεπτα για να κάνετε αυτήν την ενέργεια!__**`, ephemeral: true})
                    }
    
                } catch (error) {
                    console.log(error)
                    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
                }
    
            } else if (interaction.isButton()) {
                const button = interaction
                if(button.customId == 'verify') {
                    await interaction.guild.roles.fetch();
                    const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                    const memberRole = guildConfig.role_id;
                    const user = button.member
                    if(memberRole == null) {
                        button.reply({content: `You need to add a member role please contact <@${interaction.guild.ownerId}> in order to use this command ` + '`' + '/set_member_role' + '`', ephemeral: true});
                        return;
                    }
                    await interaction.guild.roles.fetch();
                    if(!user.roles.cache.has(memberRole)) {
                        const row = new MessageActionRow()
                            .addComponents(
                                new MessageButton()
                                .setLabel('YouTube')
                                .setStyle('LINK')
                                .setURL('https://www.youtube.com/channel/UCYxF6-G6lCqTwRc0d14RHIg')
                                .setEmoji('986425030164512808'),
                                
                                new MessageButton()
                                .setLabel('Steam')
                                .setStyle('LINK')
                                .setURL('https://steamcommunity.com/id/golld3n/')
                                .setEmoji('986425215762440232'),
                            )
                        await user.roles.add(memberRole)
                        button.reply({content: `**Έγινες με επιτυχία verify! Διάβασε τα <#815655146058940447> του server.**`, components: [row], ephemeral: true})
                    } else {
                        button.reply({content: `**Έχεις ήδη verify!**`, ephemeral: true})
                    }
                }
            }
        } catch (error) {
            functions.log(error)
            console.log(error)
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