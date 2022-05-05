const { readdirSync } = require('fs');
const ascii = require('ascii-table');
const table = new ascii().setHeading('Command', 'Load status');

module.exports = (client) => {
    readdirSync('./src/commands/').forEach(dir => {
        const commands = readdirSync(`./src/commands/${dir}/`).filter(f => f.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`../../commands/${dir}/${file}`);

            if(pull.name){
                if (pull.runCommand !== undefined) {
                    if (pull.runCommand == true) {
                        client.commands.set(pull.name, pull);
                        table.addRow(file, '✅');
                        const json = {
                            name: pull.name,
                            description: pull.description
                        }
                        cmds.push(json);
                    }else{
                        client.commands.set(pull.name, pull);
                        table.addRow(file, '✅');
                    }
                }else{
                    console.log(`Command ${pull.name} doesn't run because run is missing!`)
                }
            }else{
                table.addRow(file, '❗-> missing something??');
                continue;
            };

            if (pull.aliases && Array.isArray(pull.aliases)){
                pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
            }
        };
    });
    console.log(table.toString());
}; 