const ansiColors = require("ansi-colors");
const { MessageEmbed } = require("discord.js");

class anti_mod {
    constructor(client) {
        this.isBotOwner = client.functions.isAuthor
        this.client = client
        this.client.modCMDToOwner = false;
    }

    async check_command(interaction) {
        const blacklistCommands = [
            "kick",
            "ban",
            "mute",
        ]

        if(blacklistCommands.includes(interaction.commandName)) {
            return true;
        }
    }

    async warn_user(interaction, member) {
        const embed = new MessageEmbed();
        embed.setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL()});
        embed.setTitle('**⚠️ Warning**\n--------------');
        embed.addFields(
            { name: '➡️ Command:', value: `**__-> ${interaction.commandName}__**`, inline: true },
            { name: '➡️ Author:', value: `**__-> ${interaction.member.user.tag}__**`, inline: true },
            { name: '➡️ Guild:', value: `**__-> ${interaction.guild.name}__**`, inline: true },
            { name: '➡️ Reason:', value: `**__-> Black List command__**`, inline: false },
            { name: '➡️ You used this command:', value: `**__-> ${interaction.commandName}__**`, inline: true },
            { name: '➡️ You used this to:', value: `**__-> Bot Owner/Developer ${member}__**`, inline: true },
            { name: '➡️ You used this command at:', value: `**__-> ${new Date(interaction.createdTimestamp)}__**`, inline: true },
        );
        embed.setColor('#ff0000');
        embed.setTimestamp();

        await interaction.editReply({ embeds: [embed], ephemeral: true });
    }

    async notify_BotOwner(interaction, member) {
        const embed = new MessageEmbed();
        embed.setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.displayAvatarURL()});
        embed.setTitle('**⚠️ Warning**\n--------------');
        embed.addFields(
            { name: '➡️ Command:', value: `**__-> ${interaction.commandName}__**`, inline: true },
            { name: '➡️ Author:', value: `**__-> ${interaction.member.user.tag}__**`, inline: true },
            { name: '➡️ Guild:', value: `**__-> ${interaction.guild.name}__**`, inline: true },
            { name: '➡️ Reason:', value: `**__-> Black List command__**`, inline: false },
            { name: '➡️ You used this command:', value: `**__-> ${interaction.commandName}__**`, inline: true },
            { name: '➡️ You used this to:', value: `**__-> Bot Owner/Developer ${member}__**`, inline: true },
            { name: '➡️ You used this command at:', value: `**__-> ${new Date(interaction.createdTimestamp)}__**`, inline: true },
        );
        embed.setColor('#ff0000');
        embed.setTimestamp();

        await member.send({ embeds: [embed] });
    }

    async disable_bot(interaction) {
        try {
            this.client.functions.log(`${ansiColors.yellow("[Anti-Mod]")} Command [${interaction.commandName}] in ${interaction.guild.name} Blocked`)
            await interaction.followUp({content: "⚠️ I'm sorry, but I can't do that for you. You need to have a talk with me bot dev ", ephemeral: true});
            return true
        } catch (error) {
            console.log(error)
        }
    }

    async execute(interaction) {
        if(this.client.modCMDToOwner) {
            await interaction.deferReply({ephemeral: true})
            await this.disable_bot(interaction)
            return true;
        }
        let SubCommandName = null;
        if(interaction.options._subcommand != null) {
            this.client.subCommands.get(interaction.commandName).subCommands.forEach(subCommand => {
                const subCommandName = new subCommand(this.client)
                if(subCommandName.name == interaction.options._subcommand) {
                    SubCommandName = subCommandName 
    
                }    
            })
        }
        
        const command = SubCommandName == null ? this.client.commands.get(interaction.commandName) : SubCommandName;
        
        this.client.functions.log(`${ansiColors.yellow("[Anti-Mod]")} Command [${command.name}] in ${interaction.guild.name}`)
        const member = interaction.options.getUser('user');
        if(await this.check_command(interaction)) {
            if(this.isBotOwner(member) == false) {
                return;
            }
            await interaction.deferReply({ephemeral: true})

            this.client.modCMDToOwner = true
            this.client.functions.log(`${ansiColors.yellow("[Anti-Mod]")} Command [${interaction.commandName}] in ${interaction.guild.name} tried to ${member}`)
            await this.notify_BotOwner(interaction, member);
            await this.warn_user(interaction, member);
            return await this.disable_bot(interaction)
        }
        return false
    }
}

module.exports = anti_mod;