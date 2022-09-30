const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class setDescriptionSubCommand extends SubCommand {
	constructor(client) {
		super('set_description', 'Set the description of the bot', 0, true);
		this.client = client;
	}

	getSlashCommandBuilder() {
		const builder = super.getSlashCommandBuilder()
		return builder;
	}

	async run(interaction) {
		// try {
		// 	const embed = new MessageEmbed();
		// 	embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
		// 	embed.setTitle('**❗Ping**\n--------------');
		// 	embed.addField('➡️ Latence:', `**__-> ${Date.now() - interaction.createdTimestamp}ms__**`);
		// 	interaction.reply({ embeds: [embed]});

		// } catch (error) {
		// 	console.error(error);
		// 	this.client.functions.log(`Error in Command [Ping] in ${interaction.guild.name}`, error)
		// }

	}
};