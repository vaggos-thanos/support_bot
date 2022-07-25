const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'set_username',
    category: 'client_customization',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Ping the bot',
 
	data: new SlashCommandBuilder()
	.setName('set_username')
	.setDescription('Ping the bot')
	.addStringOption(option =>
		option.setName('username')
		.setDescription('The username to set')
		.setRequired(true)
		),
	async execute (client, db_handler, interaction) {
		try {
			const username = interaction.options.getString('username');
			await client.user.setUsername(username);
			await interaction.reply({content: 'Username set', ephemeral: true});
		} catch (error) {
			interaction.reply({content: 'Error in command [set_username]. Please try again with diferent username', ephemeral: true});
			console.error(error);
			functions.log('Error in command [set_username] in ' + interaction.guild.name)
		}

	}
};