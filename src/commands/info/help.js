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
            for (const [id, data] of this.client.commands) {
                if (id !== undefined && data.description !== undefined ) {
                    embed.addField(`➡️ Command: /${id}`, '`' + `-> ${data.description}` + '`')  
                }
            }
            if(interaction.options._subcommand != null) {
                let added = []
                this.client.subCommands.forEach(async (MainSubCommand) => {
                    let title = ''
                    let description = ''
                    MainSubCommand.subCommands.forEach(async (subCommand) => {
                        const subCommandData = new subCommand(this.client)
                        // console.log(subCommandData.name)
                        let change = false
                        // console.log(subCommandData.ownerOnly, subCommandData.permissions, subCommandData.OnlyRoles, subCommandData.OnlyUsers)
                        if(subCommandData.ownerOnly && change == false) {
                            if(await this.client.functions.isOwner(interaction.member.id)) {
                                console.log('owner')
                                title = `➡️ Command: /${MainSubCommand.name}`
                                description += `-> name: `+ "`" +`${subCommandData.name}`+ '`' +`\n description: `+ '`' + `${subCommandData.description}\n` + '`'
                                // change = true
                            }
                        } else if((subCommandData.permissions != null ? (subCommandData.permissions).length : 0) && change == false) {
                            const perms = subCommandData.permissions
                            for(const perm of perms) {
                                if(await interaction.member.permissions.has(perm)) {
                                    console.log('perms')
                                    title = `➡️ Command: /${MainSubCommand.name}`
                                    description += `-> name: `+ "`" +`${subCommandData.name}`+ '`' +`\n description: `+ '`' + `${subCommandData.description}\n` + '`'
                                    // change = true
                                }
                            }
                        } else if((subCommandData.OnlyRoles != null ? (subCommandData.OnlyRoles).length : 0) && change == false) {
                            const roles = subCommandData.OnlyRoles
                            for(const role of roles) {
                                if(await interaction.member.roles.cache.has(role)) {
                                    console.log('roles')
                                    title = `➡️ Command: /${MainSubCommand.name}`
                                    description += `-> name: `+ "`" +`${subCommandData.name}`+ '`' +`\n description: `+ '`' + `${subCommandData.description}\n` + '`'
                                    // change = true
                                }
                            }
                        } else if((subCommandData.OnlyUsers != null ? (subCommandData.OnlyUsers).length : 0) > 0 && change == false) {
                            const users = subCommandData.OnlyUsers
                            for(const user of users) {
                                if(interaction.member.id == user) {
                                    console.log('users')
                                    title = `➡️ Command: /${MainSubCommand.name}`
                                    description += `-> name: `+ "`" +`${subCommandData.name}`+ '`' +`\n description: `+ '`' + `${subCommandData.description}\n` + '`'
                                    // change = true
                                }
                            }
                        } else if (change == false) {
                            console.log(subCommandData.name)
                            console.log('else')
                            title = `➡️ Command: /${MainSubCommand.name}`
                            description += `-> name: `+ "`" +`${subCommandData.name}`+ '`' +`\n description: `+ '`' + `${subCommandData.description}\n` + '`'
                            // change = true
                        }
                    })
                    console.log(title)
                    console.log(description.length)
                    console.log(description)
                    if(title.length > 0 && description.length > 0) {
                        embed.addField(title, description)
                    }
                })
                // this.client.subCommands.get(interaction.commandName).subCommands.forEach(subCommand => {
                //     const SubCommand = new subCommand(this.client)
                //     embed.addField(`➡️ Command: /${SubCommand.name}`, '`' + `-> ${SubCommand.description}` + '`')   
                // })
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