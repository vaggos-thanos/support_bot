const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class supportSubCommand extends SubCommand{
	constructor(client) {
		super('support', 'Alert the server staff that you need support', 0, false);
		this.client = client;
	}

	getSlashCommandBuilder() {
		const builder = super.getSlashCommandBuilder()
		return builder;
	}
 
	async run(interaction) {
		try {
			interaction.reply(`<@&963897569656860672> <@&829852428164923392> <@&966087756210122762> **παρακαλείστε να εξυπηρετήσετε τον/ην ${interaction.member} το συντομότερο δυνατό!**`)
		} catch (error) {
			console.log(error)
			this.functions.log(`Error in Command [support] in ${interaction.guild.name}`, error)
		}

	}
};