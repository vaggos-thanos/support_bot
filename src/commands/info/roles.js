const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'roles',
    category: 'info',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'List all the roles',
 
	data: new SlashCommandBuilder()
	.setName('roles')
	.setDescription('Show the roles of the server'),
	async execute (client, db_handler, interaction) {
		try {
			await interaction.deferReply({ephemeral: true})

			let roles = []
			let counter = 0;
			await interaction.guild.roles.fetch();
			await interaction.guild.members.fetch();

			const roless = interaction.guild.roles.cache
			for ([id, role] of roless) {
				counter++;
				const members = interaction.guild.members.cache.filter(member => member.roles.cache.has(role.id));
				roles.push([`<@&${role.id}> ` + '`' + members.size + ' members' + '`' + `\n`]);
			}

			let runs = Math.ceil(counter / 20);
			let i = 0;
			let new_roles = [];
			let max_roles = 20;

			while (i < runs) {
				i++
				let db = []
				let ii = 0

				while(ii < max_roles && ii < roles.length) {
					db.push(roles[ii]);
					ii++
				}
				new_roles.push(db);
				roles.splice(0 , ii)
			}

			let Embeds = [];
			let while_state = true

			for (let i = 0; i < runs; i++) {
				const fieldCount = 1;
				let fields = new Array(fieldCount);
				fields.fill('');
	
				const embed = new MessageEmbed();
				embed.setAuthor({name: client.user.username, iconURL: client.user.displayAvatarURL()});
				embed.setColor('#fcba03')
				embed.setTimestamp()
				embed.setThumbnail(interaction.guild.iconURL())

				var iiii = 0;

				for (data of new_roles[i]) {
					fields[(iiii+1)%fieldCount] += data[0]; // first 12 characters of players name
					iiii++
				}

				for (var iiiiiii = 0; iiiiiii < fields.length; iiiiiii++) {
					let field = fields[iiiiiii];
					if (fields.length > 0) {
						embed.addField(`⬇️ Roles:`, field);
					}
				}

				//await functions.sleep(1000);
				Embeds.push(embed);

				if(i == runs - 1) {
					while_state = false
				}
			}

			while(while_state) {
				functions.sleep(100);
			}

			interaction.editReply({ embeds: Embeds, ephemeral: true });

		} catch (error) {
			functions.log(`Error in Command [roles] in ${interaction.guild.name}`, error)
		}

	},
};