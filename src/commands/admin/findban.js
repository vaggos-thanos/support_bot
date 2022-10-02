const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class findbanSubCommand extends SubCommand {
    constructor(client) {
        super('findban', 'Find a ban', 0, false, [], [
            "829852428164923392",
            "1000872316382752882",
            "966087756210122762", 
            "985666598792749106", 
            "970563614593413151", 
            "970175894167621723", 
            "956181908746817546", 
            "982314001797103737", 
            "815650011287126067"
        ]);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addStringOption(option =>
            option.setName('userid')
            .setDescription('The Banned user to find')
            .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        const user = interaction.options.getString('userid');

        try {
            const isnum = /^\d+$/.test(user)
            const ban_userinfo = isnum ? parseInt(user) <= 9999999999999999999 ? (await interaction.guild.bans.fetch(user)) : null : null;

            if(ban_userinfo != undefined || ban_userinfo != null) {
                const member = ban_userinfo.user
                const joined_discord = new Date(member.createdAt)
                const id = member.id
                const isBot = member.bot ? "Yeap 🤖" : "Nope 👀"
                const isSystem = member.system ? "Yeap 🤖" : "Nope 👀"
                const username = `${member.username}#${member.discriminator}`
                
                const embed = new MessageEmbed()
                embed.setAuthor({name: this.client.user.tag, iconURL: this.client.user.displayAvatarURL()})
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
            } else if (isnum == false) {
                // emebed error message
                const embed = new MessageEmbed()
                .setColor('#ff0000')
                .setTitle('Δέν Βρέθηκε κάποιο Ban!') 
                .setDescription(`${user} was not found`)
                .setTimestamp()
                .setThumbnail(this.client.user.displayAvatarURL())
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } catch (error) {            
            // emebed error message
            const embed = new MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Δέν Βρέθηκε κάποιο Ban!') 
            .setDescription(`${user} was not found`)
            .setTimestamp()
            .setThumbnail(this.client.user.displayAvatarURL())
            await interaction.reply({ embeds: [embed], ephemeral: true });

            this.client.functions.log(`Error in Command [Findban] in ${interaction.guild.name}`, error)
        }
    }
}