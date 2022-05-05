const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Ping the bot',

    run: async (client, message, args) => {
		//create a latence test command
		try {
			const embed = new MessageEmbed();
			embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
			embed.setTitle('**❗Ping**\n--------------');
			embed.addField('➡️ Latence:', `**__-> ${Date.now() - message.createdTimestamp}ms__**`);
			message.reply({ embeds: [embed]});

		} catch (error) {
			functions.log(`Error in Command [Ping] in ${message.guild.name}`, error)
		}

	},
};