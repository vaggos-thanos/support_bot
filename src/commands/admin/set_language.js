const { SlashCommandBuilder } = require('@discordjs/builders');
const { SubCommand } = require('../../Classes/Command');

module.exports = class set_language_SubCommand extends SubCommand {
    constructor(client) {
        super("set_language", "Set the language of the but",  5, true);
        this.client = client;
    }

    getSlashCommandBuilder() {
        const builder = super.getSlashCommandBuilder()
        .addRoleOption(option =>
            option.setName('lang')
            .setDescription('The lang to set')
            .setRequired(true)
            .addChoices(
                {name: "English", value: "en"},
                {name: "Greek", value: "gr"}
            )
        )
        return builder;
    }

    async run(interaction) {
        try {
            let lang = interaction.options.getRole('lang');
            if(lang) {
                await this.client.language.setLanguage(lang, interaction.guild.id)
            }
        } catch (error) {
            this.client.functions.log(`Error in command set_language: `, error);
        }
    }
}