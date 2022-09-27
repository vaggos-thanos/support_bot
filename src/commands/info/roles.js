const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class rolesSubCommand extends SubCommand {
	constructor(client) {
		super('roles', 'List all the roles', 0, false, [], [
            "829852428164923392",
            "1000872316382752882",
            "966087756210122762", 
            "985666598792749106", 
            "970563614593413151", 
            "970175894167621723", 
            "956181908746817546", 
            "982314001797103737", 
            "815650011287126067"
        ]);
		this.client = client;
	}

	getSlashCommandBuilder() {
		const builder = super.getSlashCommandBuilder()
		return builder;
	}
	
	async run(interaction) {
		try {
			await interaction.deferReply({ephemeral: true})

			let roles = []
			let counter = 0;
			await interaction.guild.roles.fetch();
			await interaction.guild.members.fetch();

			const roless = interaction.guild.roles.cache
			for (const [id, role] of roless) {
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
				embed.setAuthor({name: this.client.user.username, iconURL: this.client.user.displayAvatarURL()});
				embed.setColor('#fcba03')
				embed.setTimestamp()
				embed.setThumbnail(interaction.guild.iconURL())

				var iiii = 0;

				for (const data of new_roles[i]) {
					fields[(iiii+1)%fieldCount] += data[0]; // first 12 characters of players name
					iiii++
				}

				for (var iiiiiii = 0; iiiiiii < fields.length; iiiiiii++) {
					let field = fields[iiiiiii];
					if (fields.length > 0) {
						embed.addField(`⬇️ Roles:`, field);
					}
				}

				Embeds.push(embed);

				if(i == runs - 1) {
					while_state = false
				}
			}

			while(while_state) {
				this.client.functions.sleep(100);
			}

			interaction.editReply({ embeds: Embeds, ephemeral: true });

		} catch (error) {
			this.client.functions.log(`Error in Command [roles] in ${interaction.guild.name}`, error)
		}

	}
};