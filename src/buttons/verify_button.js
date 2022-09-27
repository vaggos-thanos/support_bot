const { MessageActionRow } = require("discord.js");
const { Button } = require("../Classes/Button");
const steam_button = require("./steam_button");
const youtub_button = require("./youtub_button");

module.exports = class verify_button extends Button {
    constructor(client) {
        super("verify_button");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder();
        builder.setLabel('Verify')
        builder.setStyle('SUCCESS')
        builder.setCustomId(this.name)

        return builder;
    }

    async run(interaction) {
        await interaction.guild.roles.fetch();
        const guildConfig = await this.client.GuildConfigs.get(interaction.guild.id);
        const memberRole = guildConfig.role_id;
        const user = interaction.member
        if(memberRole == null) {
            interaction.reply({content: `You need to add a member role please contact <@${interaction.guild.ownerId}> in order to use this command ` + '`' + '/set_member_role' + '`', ephemeral: true});
            return;
        }
        await interaction.guild.roles.fetch();
        if(!user.roles.cache.has(memberRole)) {
            // import role from manager
            const steamB = new steam_button(this.client).getButtonBuilder();
            const youtubeB = new youtub_button(this.client).getButtonBuilder();

            const row = new MessageActionRow().addComponents(steamB, youtubeB)

            await user.roles.add(memberRole)
            interaction.reply({content: `**Έγινες με επιτυχία verify! Διάβασε τα <#815655146058940447> του server.**`, components: [row], ephemeral: true})
        } else {
            interaction.reply({content: `**Έχεις ήδη verify!**`, ephemeral: true})
        }
    }
}