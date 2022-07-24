require('dotenv').config();
const SYSManager = require('./src/managers/sysManagers');

const scope = 'local' // local or global
const guildId = '123456789012345678' // guild id
const clientId = '123456789012345678' // client(bot) id

const sysManager = new SYSManager({id: clientId})
sysManager.SlashBuild(guildId, '../commands' ,scope);