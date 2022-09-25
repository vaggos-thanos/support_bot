const { ButtonHandler } = require('../Classes/Button')
const archive_ticket = require('./archive_ticket')
const close_ticket = require('./close_ticket')
const reopen_ticket = require('./reopen_ticket')
const claim_ticket = require('./claim_ticket')
const delete_ticket = require('./delete_ticket')
class buttons extends ButtonHandler {
    constructor() {
        super([ archive_ticket, close_ticket, reopen_ticket, claim_ticket, delete_ticket ])
    }
}

module.exports = buttons