const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class setWelcomeChannelCommand extends SubCommand { 
    constructor(client) {
        super("set_welcome_channel", "Set the welcome channel for the server",  5, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The channel to set as the welcome channel')
                .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        try {
            if(this.functions.isAdmin(interaction.member)) {
                let channel = interaction.options.getChannel('channel');
                const guildConfig = await this.client.GuildConfigs.get(interaction.guild.id);
                
                if(channel) {

                    const update = await db_handler.update_row('GuildConfig', 'welcome_channel_id', channel.id, 'guild_id', interaction.guild.id)
                    await this.client.GuildConfigs.set(interaction.guild.id, update.data)

                    interaction.reply("Welcome channel set to " + channel.name).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            this.functions.log(`Error in command set_welcome_channel: ${error}`, 'error');
        }
    }
}