const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    name: 'set_welcome_role',
    category: 'welcome',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the welcome role for the server',

    run: async (client, message, args) => {
        if(functions.isAdmin(message.member)) {
            let role = message.mentions.roles.first();
            if(role == undefined) {
                message.reply("Please mention a role!").then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
                return;
            }

            const guildConfig = await client.GuildConfigs.get(message.guild.id);
            if(role) {
                functions.updateDB(
                    client, 
                    'GuildConfig', 
                    'role_id', 
                    role.id, 
                    'GuildConfigs', 
                    (message.guild.id, [message.guild.id, guildConfig[1], guildConfig[2], guildConfig[3], role.id, guildConfig[5], guildConfig[6]]),
                    'guild_id', 
                    message.guild.id
                );
                message.reply("Welcome role set to " + role.name).then(msg => {
                    setTimeout(() => {
                        msg.delete();
                        message.delete();
                    }, 5000);
                });
            }
        }
    }
}