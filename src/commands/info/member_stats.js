const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { SubCommand } = require('../../Classes/Command');

module.exports = class member_statsSubCommand extends SubCommand {
    constructor(client) {
        super('member_stats', 'shows the stats of a member', 0, false);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder();
        builder.addUserOption(option =>
            option.setName('user')
                .setDescription('The user to get the stats of')
                .setRequired(true)
        );
        return builder;
    }

    async run(interaction) {
        const user = interaction.options.getUser('member');
        const member = interaction.guild.members.cache.get(user.id);
        
        const joined_server = member.joinedAt
        const joined_discord = new Date(member.user.createdAt)
        let   server_booster = member.premiumSinceTimestamp
        const user_roles = member.roles.cache
        const id = member.user.id
        const isBot = member.user.bot ? "Yeap 🤖" : "Nope 👀"
        const isSystem = member.user.system ? "Yeap 🤖" : "Nope 👀"
        const username = `${member.user.username}#${member.user.discriminator}`

        if (server_booster != null) {
            server_booster = new Date(server_booster)
        } else {
            server_booster = "Nope :("
        }

        let user_rolesC = -1
        for (const role of user_roles) {
            user_rolesC++ 
        }
        const embed = new MessageEmbed()
        embed.setAuthor({name: this.client.user.tag, iconURL: this.client.user.displayAvatarURL()})
        embed.setTitle(`${username}'s stats`)
        embed.addFields(
            {name: "**User's Personal Info**", value: "⬇️", inline: false},
            {name: "**Username**", value: '```' + `${username}` + '```', inline: true},
            {name: "**ID**", value: '```' + `${id}` + '```', inline: true},
            {name: "**User's Time Logs**", value: "⬇️", inline: false},
            {name: "**Joined Server 👑**", value: '```' + `${joined_server}` + '```', inline: true},
            {name: "**Joined Discord ⏱️**", value: '```' + `${joined_discord}` + '```', inline: true},
            {name: "**Server Booster 🔮**", value: '```' + `${server_booster}` + '```', inline: true},
            {name: "**Security Check**", value: "⬇️", inline: false},
            {name: "**Is Bot 🤖**", value: '```' + `${isBot}` + '```', inline: true},
            {name: "**Is System Bot 🤖**", value: '```' + `${isSystem}` + '```', inline: true},
            {name: "**Role Count 📚**", value: '```' + `${user_rolesC}` + '```', inline: true},
            
        )
        embed.setColor('#fcba03')
        embed.setTimestamp()
        embed.setThumbnail(member.displayAvatarURL())

        await interaction.reply({embeds: [embed], ephemeral: true})
    }
}