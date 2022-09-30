const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class membersSubCommand extends SubCommand {
	constructor(client) {
		super('members', 'Show the members of the server that has a specific role', 0, false, [], [
			"815650011287126067",
			"982314001797103737",
			"956181908746817546",
			"970175894167621723",
			"970563614593413151",
			"985666598792749106",
			"966087756210122762",
			"1000872316382752882",
			"829852428164923392",
			"963897569656860672",
			"815650121747660881"
		]);
		this.client = client;
	}
	
	getSlashCommandBuilder() {
		const builder = super.getSlashCommandBuilder();
		builder.addRoleOption(option =>
			option.setName('role')
				.setDescription('The role to show the members of')
				.setRequired(true)
		);
		return builder;
	}

	async run(interaction) {
		try {
			await interaction.deferReply({ephemeral: true})

			const role = interaction.options.getRole('role')
			await interaction.guild.members.fetch()
			const members = interaction.guild.members.cache
			const memberss = []
			let counter = 0;

			for (const [id, member] of members) {
				if(member.roles.cache.has(role.id)) {
					counter++;
					const content = `<@${member.id}> 🟡 ` + '`' + member.user.tag + '`' + `\n`; 
					memberss.push([content, content.length]);
				}
			}

			let players_max = 24;
			let runs = Math.ceil(counter / players_max);
			let i = 0;
			let new_members = [];

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
				var iiii = 0;
				
				const embed = new MessageEmbed();
				embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
				embed.setThumbnail(this.client.user.displayAvatarURL())
				if(i == 0) {
					const membercount = interaction.guild.members.cache.filter(member => member.roles.cache.has(role.id)).size;
					embed.setDescription(`${role} - ` + '`' + `${membercount} users`+ '`')
				}
				embed.setColor('#fcba03')

				for (const data of new_members[i]) {
					fields[(iiii+1)%fieldCount] += data[0]; // first 12 characters of players name
					iiii++
				}

				for (var iiiiiii = 0; iiiiiii < fields.length; iiiiiii++) {
					let field = fields[iiiiiii];
					if (fields.length > 0) {
						embed.addField(`\n⬇️ Members:`, field);
					}
				}

				Embeds.push(embed);

				if(i == runs - 1) {
					while_state = false
				}
			}

			while(while_state) {
				this.client.functions.sleep(10);
			}

			interaction.editReply({ embeds: Embeds });

		} catch (error) {
			console.error(error);
			this.client.functions.log(`Error in Command [Members] in ${interaction.guild.name}`)
		}
	}
}