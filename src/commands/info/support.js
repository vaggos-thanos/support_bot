const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'support',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Returns the support server',

    run: async (client, message, args) => {
		//create a latence test command
		try {

			message.channel.send(`<@&963897569656860672> <@&829852428164923392> <@&966087756210122762> παρακαλείστε να εξυπηρετήσετε τον/ην ${message.author} το συντομότερο δυνατό!`)
		} catch (error) {
			console.log(error)
			functions.log(`Error in Command [Ping] in ${message.guild.name}`, error)
		}

	},
};