const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'findban',
    category: 'admin',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Find a ban',

    data: new SlashCommandBuilder()
    .setName('findban')
    .setDescription('Find a ban')
    .addStringOption(option =>
        option.setName('userid')
        .setDescription('The Banned user to find')
        .setRequired(true)
    ),
    async execute (client, db_handler, interaction) {
        try {
            const user = interaction.options.getString('userid');
            const isnum = /^\d+$/.test(user)
            const ban_userinfo = isnum ? parseInt(isnum) >= 9223372036854775807 ? await interaction.guild.bans.fetch(user) : null : null;

            if(ban_userinfo != undefined || ban_userinfo != null) {
                const member = ban_userinfo.user
                const joined_discord = new Date(member.createdAt)
                const id = member.id
                const isBot = member.bot ? "Yeap 🤖" : "Nope 👀"
                const isSystem = member.system ? "Yeap 🤖" : "Nope 👀"
                const username = `${member.username}#${member.discriminator}`
                
                const embed = new MessageEmbed()
                embed.setAuthor({name: client.user.tag, iconURL: client.user.displayAvatarURL()})
                embed.setTitle(`${username}'s stats`)
                embed.addFields(
                    {name: "**User's Personal Info**", value: "⬇️", inline: false},
                    {name: "**Username**", value: '```' + `${username}` + '```', inline: true},
                    {name: "**ID**", value: '```' + `${id}` + '```', inline: true},
                    {name: "**User Ban Status**", value: '```' + `⬇️` + '```', inline: false},
                    {name: "**Is Banned**", value: '```' + "Yeap 🤖" + '```', inline: true},
                    //{name: "**Banned By**", value: '```' + mod + '```', inline: true},
                    {name: "**Banned Reason**", value: '```' + `${ban_userinfo.reason == null ? "There is no reason" : ban_userinfo.reason}` + '```', inline: true},
                    {name: "**User's Time Logs**", value: "⬇️", inline: false},
                    {name: "**Joined Discord ⏱️**", value: '```' + `${joined_discord}` + '```', inline: true},
                    {name: "**Security Check**", value: "⬇️", inline: false},
                    {name: "**Is Bot 🤖**", value: '```' + `${isBot}` + '```', inline: true},
                    {name: "**Is System Bot 🤖**", value: '```' + `${isSystem}` + '```', inline: true},
                    
                )
                embed.setColor('#fcba03')
                embed.setTimestamp()
                embed.setThumbnail(member.displayAvatarURL())

                await interaction.reply({embeds: [embed], ephemeral: true});
            } else {
                // emebed error message
                const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Δέν Βρέθηκε κάποιο Ban!') 
                .setDescription(`${user} was not found`)
                .setTimestamp()
                .setThumbnail(client.user.displayAvatarURL())
                await interaction.reply({ embeds: [embed], ephemeral: true });

            }
        } catch (error) {
            console.log(error)
            functions.log(`Error in Command [Commands] in ${interaction.guild.name}`)
        }
    }
}