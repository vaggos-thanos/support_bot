const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'members',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Show the members of the server that has a specific role',
 
	data: new SlashCommandBuilder()
	.setName('members')
	.setDescription('Show the members of the server that has a specific role')
	.addMentionableOption(option => 
		option.setName('role')
		.setDescription('The role to check')
		.setRequired(true)
	),
	async execute (client, interaction) {
		try {
			await interaction.reply({content: 'Here is the list of members with the role **' + interaction.options.getMentionable('role').name + '**', ephemeral: true});

			const role = interaction.options.getMentionable('role')
			await interaction.guild.members.fetch()
			const members = interaction.guild.members.cache
			const memberss = []
			let counter = 0;
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

			if(runs == 0 ) {
				await interaction.editReply({ content: '**Ο ρόλος δεν έχει μέλη!**' });
				return;
			}

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
			let Embeds = [];
			let while_state = true

			for (let i = 0; i < runs; i++) {
				const fieldCount = 1;
				let fields = new Array(fieldCount);
				fields.fill('');
				
				const embed = new MessageEmbed();
				embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
				embed.setThumbnail(client.user.displayAvatarURL())
				embed.setDescription(`${role}`)
				embed.setColor('#fcba03')
				var iiii = 0;

				for (data of new_members[i]) {
					fields[(iiii+1)%fieldCount] += data[0]; // first 12 characters of players name
					iiii++
				}

				for (var iiiiiii = 0; iiiiiii < fields.length; iiiiiii++) {
					let field = fields[iiiiiii];
					if (fields.length > 0) {
						embed.addField(`\n⬇️ Members:`, field);
					}
				}

				await functions.sleep(1000);
				Embeds.push(embed);

				if(i == runs - 1) {
					while_state = false
				}
			}

			while(while_state) {
				functions.sleep(100);
			}

			interaction.channel.send({ embeds: Embeds });

		} catch (error) {
			console.error(error);
			functions.log(`Error in Command [Members] in ${interaction.guild.name}`, error)
		}
	}
}