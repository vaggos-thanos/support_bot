const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class helpSubCommand extends SubCommand {
    constructor(client) {
        super('help', 'Help command', 0, false);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder();
        return builder;
    }
    
    async run(interaction) {
        try {
            const embed = new MessageEmbed();
            embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
            embed.setTitle('Help');
            embed.setDescription('This is the help command');
            
            for (const [id, data] of this.client.commands) {
                if (id !== undefined && data.description !== undefined ) {
                    embed.addField(`➡️ Command: /${id}`, '`' + `-> ${data.description}` + '`')  
                }
            }

            if(interaction.options._subcommand != null) {
                let added = []
                for(const [id, data] of this.client.subCommands) {
                    let title = ``
                    let description = ``
                    
                    for(const SubCommand of data.subCommands) {
                        const subCommand = new SubCommand(this.client)
                        if(subCommand.ownerOnly && added.includes(subCommand.name) == false) {
                            let i = 0
                            if(await this.client.functions.isOwner(interaction.member.id) == false) {
                                i++
                                await added.push(subCommand.name)
                                title = `➡️ Command: /${id}`
                                description += `-> name: `+ "`" +`${subCommand.name}`+ '`' +`\n description: `+ '`' + `${subCommand.description}\n` + '`'
                            }
                        }

                        if ((subCommand.permissions != null ? (subCommand.permissions).length : 0) > 0 && added.includes(subCommand.name) == false) {
                            const perms = subCommand.permissions
                            for(const perm of perms) {
                                if(await interaction.member.permissions.has(perm) && added.includes(subCommand.name) == false) {
                                    await added.push(subCommand.name)
                                    title = `➡️ Command: /${id}`
                                    description += `-> name: `+ "`" +`${subCommand.name}`+ '`' +`\n description: `+ '`' + `${subCommand.description}\n` + '`'
                                }
                            }
                        }

                        if ((subCommand.OnlyRoles != null ? (subCommand.OnlyRoles).length : 0) > 0 && added.includes(subCommand.name) == false) {
                            const roles = subCommand.OnlyRoles
                            for(const role of roles) {
                                if(await interaction.member.roles.cache.has(role) && added.includes(subCommand.name) == false) {
                                    await added.push(subCommand.name)
                                    title = `➡️ Command: /${id}`
                                    description += `-> name: `+ "`" +`${subCommand.name}`+ '`' +`\n description: `+ '`' + `${subCommand.description}\n` + '`'
                                }
                            }
                        }
                        
                        if ((subCommand.OnlyUsers != null ? (subCommand.OnlyUsers).length : 0) > 0 && added.includes(subCommand.name) == false) {
                            const users = subCommand.OnlyUsers
                            for(const user of users && added.includes(subCommand.name) == false) {
                                await added.push(subCommand.name)
                                if(interaction.member.id == user) {
                                    title = `➡️ Command: /${id}`
                                    description += `-> name: `+ "`" +`${subCommand.name}`+ '`' +`\n description: `+ '`' + `${subCommand.description}` + '`\n'
                                }
                            }
                        }
                        
                    }
                    if(title.length > 0 && description.length >= 0) {
                        embed.addField(title, description)
                    }
                }
            }
            embed.setColor('#fcba03')
            embed.setTimestamp()
            embed.setThumbnail(this.client.user.displayAvatarURL())

            interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (error) {
            console.log(error)
            this.client.functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}