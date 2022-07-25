const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'ping',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Ping the bot',
 
	data: new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Ping the bot'),
	async execute (client, db_handler, interaction) {
		try {
			const embed = new MessageEmbed();
			embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
			embed.setTitle('**❗Ping**\n--------------');
			embed.addField('➡️ Latence:', `**__-> ${Date.now() - interaction.createdTimestamp}ms__**`);
			interaction.reply({ embeds: [embed], ephemeral: true });

		} catch (error) {
			console.error(error);
			functions.log(`Error in Command [Ping] in ${interaction.guild.name}`)
		}

	}
};