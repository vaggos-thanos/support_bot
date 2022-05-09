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

			let memberss = []
			let counter = 0;
			await message.guild.members.fetch();

			const members = message.guild.members.cache
			for ([id, member] of members) {
				if(member.roles.cache.has(role.id)) {
					counter++;
					const content = `<@${member.id}> 🟡 ` + '`' + member.user.tag + '`' + `\n`; 
					memberss.push([content, content.length]);
				}
			}

			let runs = Math.ceil(counter / 10);
			let i = 0;
			let new_members = [];
			let players_max = 10;

			while (i < runs) {
				i++
				let db = []
				let ii = 0

				while(ii < players_max && ii < memberss.length) {
					db.push(memberss[ii]);
					ii++
				}
				new_members.push(db);
				memberss.splice(0 , ii)
			}

			for (let i = 0; i < runs; i++) {
				const fieldCount = 1;
				let fields = new Array(fieldCount);
				fields.fill('');
	
				const embed = new MessageEmbed();
				embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
				embed.setColor('#fcba03')
				var iiii = 0;

				for (data of new_members[i]) {
					fields[(iiii+1)%fieldCount] += data[0]; // first 12 characters of players name
					iiii++
				}

				for (var iiiiiii = 0; iiiiiii < fields.length; iiiiiii++) {
					let field = fields[iiiiiii];
					if (fields.length > 0) {
						embed.addField(`⬇️ Members:`, field);
					}
				}
				await functions.sleep(1000);
	
				message.channel.send({ embeds: [embed]});
			}

		} catch (error) {
			functions.log(`Error in Command [Members] in ${message.guild.name}`, error)
		}

	},
};