const { Button } = require("../Classes/Button");

class close_ticket extends Button {
    constructor(client) {
        super("close_ticket");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder();
        builder.setLabel("Close Ticket");
        builder.setStyle('DANGER');
        builder.setEmoji('🔐')

        return builder;
    }

    async run(interaction) {

    }
}

module.exports = close_ticket