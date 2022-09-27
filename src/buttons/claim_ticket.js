const { Button } = require("../Classes/Button");

class claim_ticket extends Button {
    constructor(client) {
        super("claim_ticket");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder();
        builder.setLabel("Claim Ticket");
        builder.setStyle('SUCCESS');
        builder.setEmoji('🔐')
        builder.setCustomId(this.name)

        return builder;
    }

    async run(interaction) {

    }
}

module.exports = claim_ticket