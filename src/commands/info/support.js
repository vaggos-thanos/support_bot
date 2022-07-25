const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'support',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Alert the server staff that you need support',
 
	data: new SlashCommandBuilder()
	.setName('support')
	.setDescription('Alert the server staff that you need support'),
	async execute (client, db_handler, interaction) {
		try {
			interaction.reply(`<@&963897569656860672> <@&829852428164923392> <@&966087756210122762> **παρακαλείστε να εξυπηρετήσετε τον/ην ${interaction.member} το συντομότερο δυνατό!**`)
		} catch (error) {
			console.log(error)
			functions.log(`Error in Command [support] in ${interaction.guild.name}`, error)
		}

	}
};