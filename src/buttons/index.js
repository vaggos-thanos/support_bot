const { ButtonHandler } = require('../Classes/Button')
const create_ticket_button = require('./close_ticket')

class buttons extends ButtonHandler {
    constructor() {
        super([create_ticket_button]);
    }
}

module.exports = buttons