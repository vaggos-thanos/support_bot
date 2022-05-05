const {MessageEmbed} = require('discord.js');
module.exports = {
    name: 'help',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Returns the commands list',
    run: async (client, message, args) => {
        try {
            const embed = new MessageEmbed();
            const guildConfig = await client.GuildConfigs.get(message.guild.id);
            embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
            embed.setTitle('**❗Command List**\n--------------');
            for (let i=0; i < cmds.length; i++){
                if (cmds[i].name !== undefined && cmds[i].description !== undefined ) {
                    embed.addField(`➡️ Command: ${guildConfig[1]}${cmds[i].name}`, `**__-> ${cmds[i].description}__**`)  
                }
            }
            message.reply({ embeds: [embed]})
        } catch (error) {
            functions.log(`Error in Command [Commands] in ${message.guild.name}`, error)
        }
    },
}