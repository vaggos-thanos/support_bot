const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class wfsSubCommand extends SubCommand {
    constructor(client) {
        super('wfs', 'Set the wfs channel for the server', 0, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as the wfs channel')
                .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        try {
            if(this.functions.isAdmin(interaction.member)) {
                let channel = interaction.options.getChannel('channel');
                if(channel != undefined) {
                    const update = await db_handler.update_row('GuildConfig', 'wfs_channel_id', channel.id, 'guild_id', interaction.guild.id)
                    await this.client.GuildConfigs.set(interaction.guild.id, update.data)

                    interaction.reply("wfs channel set to " + channel).then(msg => {
                        setTimeout(async () => {
                            await interaction.deleteReply();
                        }, 5000);
                    });
                }
            }
        } catch (error) {
            this.functions.log(`Error in command wfs: ${error}`);
        }
    }
}