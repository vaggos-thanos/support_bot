const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class pingSubCommand extends SubCommand {
	constructor(client) {
		super('ping', 'Ping command', 0, false);
		this.client = client;
	}

	getSlashCommandBuilder() {
		const builder = super.getSlashCommandBuilder()
		.addStringOption(option => 
			option.setName('type')
			.setDescription('Ping type')
			.setRequired(false)
		)
		return builder;
	}
	
	async run(interaction) {
		try {
			const embed = new MessageEmbed();
			embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
			embed.setTitle('**❗Ping**\n--------------');
			embed.addField('➡️ Latence:', `**__-> ${Date.now() - interaction.createdTimestamp}ms__**`);
			interaction.reply({ embeds: [embed], ephemeral: true });

		} catch (error) {
			console.error(error);
			this.client.functions.log(`Error in Command [Ping] in ${interaction.guild.name}`)
		}

	}
};