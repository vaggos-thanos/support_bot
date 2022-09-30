const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class setAvatarSubCommand extends SubCommand {
    constructor(client) {
        super('set_avatar', 'Set the avatar of the bot', 0, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addAttachmentOption(option => 
            option.setName('avatar')
            .setDescription('the avatar for the bot')
            .setRequired(true)
        )
        return builder;
    }

	async run(interaction) {
		try {
            const avatar = interaction.options.getAttachment('avatar');
            await this.client.user.setAvatar(avatar.url);
            await interaction.reply({content: 'Avatar set', ephemeral: true});
		} catch (error) {
			console.error(error);
			this.client.functions.log('Error in command [set_avatar] in ' + interaction.guild.name)
		}

	}
};