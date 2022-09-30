const { Button } = require("../Classes/Button");

class reopen_ticket extends Button {
    constructor(client) {
        super("reopen_ticket");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder();
        builder.setLabel("Reopen Ticket");
        builder.setStyle('SUCCESS');
        builder.setEmoji('🔓')
        builder.setCustomId(this.name)
        return builder;
    }

    async run(interaction) {

    }
}

module.exports = reopen_ticket