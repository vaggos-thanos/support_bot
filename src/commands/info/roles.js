const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'roles',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Show the roles of the server',

    run: async (client, message, args) => {
		//create a latence test command
		try {
			let roles = ''
			await message.guild.roles.fetch();
			await message.guild.members.fetch();

			const roless = message.guild.roles.cache
			for ([id, role] of roless) {
				const members = message.guild.members.cache.filter(member => member.roles.cache.has(role.id));
				roles +=  `<@&${role.id}> ` + '`' + members.size + ' members' + '`' + `\n`;
			}


			const embed = new MessageEmbed();
			embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
			embed.addField(`⬇️ Roles:`, roles);
			embed.setColor('#fcba03')
			embed.setTimestamp()
			embed.setThumbnail(message.guild.iconURL())
			message.reply({ embeds: [embed]});

		} catch (error) {
			functions.log(`Error in Command [Ping] in ${message.guild.name}`, error)
		}

	},
};