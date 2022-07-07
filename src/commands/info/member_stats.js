const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'member_stats',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'shows the stats of a member',

    data: new SlashCommandBuilder()
    .setName('member_stats')
    .setDescription('Shows the stats of a member')
    .addMentionableOption(option => 
        option.setName('member')
        .setDescription('The member you want to see the stats')
        .setRequired(true)
    ),
    async execute (client, interaction) {
        const member = interaction.options.getMentionable('member');

        const joined_server = member.joinedAt
        const joined_discord = new Date(member.joinedTimestamp)
        let   has_nitro = member.premiumSinceTimestamp
        let   server_booster = member.premiumSinceTimestamp
        const user_roles = member.roles.cache
        const id = member.user.id
        const isBot = member.user.bot ? "Yeap 🤖" : "Nope 👀"
        const isSystem = member.user.system ? "Yeap 🤖" : "Nope 👀"
        const username = `${member.user.username}#${member.user.discriminator}`

        if (has_nitro != null) {
            has_nitro = new Date(has_nitro)
        } else {
            has_nitro = "Nope :("
        }

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
        embed.setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL()})
        embed.setTitle(`${username}'s stats`)
        embed.addFields(
            {name: "**User's Personal Info**", value: "\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖", inline: false},
            {name: "**Username**", value: '```' + `${username}` + '```', inline: true},
            {name: "**ID**", value: '```' + `${id}` + '```', inline: true},
            {name: "**Has Nitro**", value: '```' + `${has_nitro}` + '```', inline: true},
            {name: "**User's Time Logs**", value: "\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖", inline: false},
            {name: "**Joined Server**", value: '```' + `${joined_server}` + '```', inline: true},
            {name: "**Joined Discord**", value: '```' + `${joined_discord}` + '```', inline: true},
            {name: "**Server Booster**", value: '```' + `${server_booster}` + '```', inline: true},
            {name: "**Security Check**", value: "\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖\\➖", inline: false},
            {name: "**Is Bot**", value: '```' + `${isBot}` + '```', inline: true},
            {name: "**Is System Bot**", value: '```' + `${isSystem}` + '```', inline: true},
            {name: "**Role Count**", value: '```' + `${user_rolesC}` + '```', inline: true},
            
        )
        embed.setColor('#fcba03')
        embed.setTimestamp()
        embed.setThumbnail(member.displayAvatarURL())

        await interaction.reply({embeds: [embed], ephemeral: true})
    }
}