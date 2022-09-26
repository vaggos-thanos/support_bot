const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class setUsernameSubCommand extends SubCommand {	
	constructor(client) {
		super('set_username', 'Set the username of the bot', 0, true);
		this.client = client;
	}
	
	getSlashCommandBuilder() {
		const builder = super.getSlashCommandBuilder()
		.addStringOption(option =>
			option.setName('username')
			.setDescription('The username to set')
			.setRequired(true)
		)
		return builder;
	}
	async run(interaction) {
		try {
			const username = interaction.options.getString('username');
			await this.client.user.setUsername(username);
			await interaction.reply({content: 'Username set', ephemeral: true});
		} catch (error) {
			interaction.reply({content: 'Error in command [set_username]. Please try again with diferent username', ephemeral: true});
			console.error(error);
			this.client.functions.log('Error in command [set_username] in ' + interaction.guild.name)
		}

	}
};