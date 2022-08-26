const { Button } = require("../Classes/Button");

class delete_ticket extends Button {
    constructor(client) {
        super("delete_ticket");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder();
        builder.setLabel("Delete Ticket");
        builder.setStyle('DANGER');
        builder.setEmoji('🔐')

        return builder;
    }

    async run(interaction) {

    }
}

module.exports = delete_ticket
