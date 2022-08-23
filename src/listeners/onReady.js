const Event = require('../Classes/Event');

module.exports = class onReady extends Event {
    constructor(client) {
        super('ready', true);
        this.client = client;
    }

    async run() {
        console.log(`Logged in as ${this.client.user.tag}!`);
    }
}