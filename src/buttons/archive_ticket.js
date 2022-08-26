const { Button } = require("../Classes/Button");

class archive_ticket extends Button {
    constructor(client) {
        super("archive_ticket");
        this.client = client;
    }

    getButtonBuilder() {
        const builder = super.getButtonBuilder();
        builder.setLabel("Archive Ticket");
        builder.setStyle('PRIMARY');
        builder.setEmoji('📁')

        return builder;
    }

    async run(interaction) {

    }
}

module.exports = archive_ticket