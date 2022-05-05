const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'members',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Show the members of the server that has a specific role',

    run: async (client, message, args) => {
		//create a latence test command
		try {
			let role = message.mentions.roles.first();
			if(role == undefined) return message.reply("Please mention a role!").then(msg => {
				setTimeout(() => {
					msg.delete();
					message.delete();
				}, 5000);
			});

			var memberss = ''
			var counter = 0;
			await message.guild.members.fetch();

			const members = message.guild.members.cache
			for ([id, member] of members) {
				if(member.roles.cache.has(role.id)) {
					console.log(member.user.username)
					counter++;
					memberss +=  `[ ${counter} ] - ${member.user.tag} ( ${member.id} ) \n`
				}
			}
			console.log(memberss);
			const embed = new MessageEmbed();
			embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
			embed.setTitle('**❗Members**\n--------------');
			embed.addField(`➡️ Members:`, '```' + memberss + '```');
			message.reply({ embeds: [embed]});

		} catch (error) {
			console.log(error)
			functions.log(`Error in Command [Ping] in ${message.guild.name}`, error)
		}

	},
};