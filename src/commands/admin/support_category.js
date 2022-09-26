const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class support_categorySubCommand extends SubCommand {
    constructor(client) {
        super('support_category', 'Create a support category', 0, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('The channel to set as the support category')
                .setRequired(true)
        )
        return builder;
    }

    async run(interaction) {
        try {
            let channel = interaction.options.getChannel('channel');
            if(channel != undefined) {
                const update = await db_handler.update_row('GuildConfig', 'wfs_category_id', channel.id, 'guild_id', interaction.guild.id)
                await this.client.GuildConfigs.set(interaction.guild.id, update.data)

                interaction.reply("wfs category set to " + channel).then(msg => {
                    setTimeout(async () => {
                        await interaction.deleteReply();
                    }, 5000);
                });
            }
        } catch (error) {
            this.client.functions.log(`Error in command support_category: ${error}`, 'error');
        }
    }
}