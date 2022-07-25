const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	name: 'set_avatar',
    category: 'client_customization',
    runCommand: true,
    cooldown: 5, /* secoonds */
    description: 'Set the avatar of the bot',
 
	data: new SlashCommandBuilder()
	.setName('set_avatar')
	.setDescription('set the avatar of the bot')
    .addAttachmentOption(option => 
        option.setName('avatar')
        .setDescription('the avatar for the bot')
        .setRequired(true)
    ),
	async execute (client, db_handler, interaction) {
		try {
            const avatar = interaction.options.getAttachment('avatar');
            await client.user.setAvatar(avatar.url);
            await interaction.reply({content: 'Avatar set', ephemeral: true});
		} catch (error) {
			console.error(error);
			functions.log('Error in command [set_avatar] in ' + interaction.guild.name)
		}

	}
};