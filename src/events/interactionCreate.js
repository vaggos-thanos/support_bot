const { MessageActionRow, MessageButton } = require("discord.js");

const anti_spam = []
module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, db_handler, interaction) {
        if(interaction.isCommand()) {
            try {
                const guildConfig = await client.GuildConfigs.get(interaction.guild.id);
                if(guildConfig == null) {
                    db_handler.create_row('GuildConfig', 'guild_id', interaction.guild.id)
    
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
                    interaction.reply("There was an error in the bot. Please try to resend the command. If it throws the same error try to cotact the bot owner.");
                    return;
                }
                const command = client.commands.get(interaction.commandName);
                const cooldown = 5;
                const cmdName = command.name
            
                const isFounderCheckArray = [
                    "set_goodbye_channel",
                    "set_welcome_channel",
                    "set_welcome_role",
                    "support_category",
                    "wfs"
                ]

                const normalCmds = [
                    "support",
                    "help",
                    "ping",
                    "roles",
                    "members"
                ]

                const isFounder = await isFounderCheckArray.reduce(async (bool, cmd) => {
                    const isOwner = await functions.isOwner(interaction.member, client)
                    return await bool || isOwner
                }, false);

                if(!isFounder) return

                const shouldPass = await normalCmds.reduce(async (bool, cmd) => {
                    return await bool || true;
                }, false)

                if (!shouldPass) {
                    if(!(await functions.isAdmin(interaction.member, client))) {
                        functions.log("The user " + interaction.member.user.username + " in " + interaction.guild.name + " (" + interaction.guild.id + ") tried to use a command but is not an admin")
                        return;
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
                const memberRole = interaction.guild.roles.cache.get('815650409833299978')
                const user = button.member

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