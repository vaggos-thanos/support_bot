const colors = require('ansi-colors');
class db_handler {
    constructor(mysql, toggle) {
        this.mysql = mysql;
        this.toggle = toggle ? toggle : true;
    }

    async login(host, username, password, database) {  
        let while_v = true

        const db = this.mysql.createPool({
            host: host,
            user: username,
            password: password,
            database: database
        })

        db.query('SELECT * FROM INFORMATION_SCHEMA.TABLES', (err, rows) => {
            if (err) {
                log('Failed to login! ❌', this.toggle, 'red')
                throw err;
            }
            this.identifier = db;
            this.database_name = database;

            log('[+] Connected to database', this.toggle , 'green');

            while_v = false
        })

        while(while_v) {
            await sleep(10)
        }

        return db;
    }
    
    async init(db_names, local_dbs) {
        let counter = 0
        while(counter < db_names.length) {
            const db_data = await this.get_all_rows(db_names[counter]);
            let counter1 = 0
            while(counter1 < db_data.length) {
                let key;
                const data = db_data[counter1];
                if(db_names[counter] == 'UsersConfigs' && db_names[counter] == 'Tickets' ) {
                    key = data.user_id
                } else {   
                    key = data.guild_id
                }
                local_dbs[counter].set(key, data);
                counter1++
            }
            counter++;              
        }
        console.log(colors.green('[+] Local Database initialized!'));
        return {done: true}
    }

    async check_table(table_name) {
        return new Promise((resolve, reject) => {
            this.identifier.query(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${table_name}'`, (err, rows) => {
                if (err) {
                    reject(err);
                }
                if(rows.length == 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }
            })
        })
    }

    check_table_content(table_name, key_name, key_value) {
        
    }

    async get_all_rows(table_name) {
        let while_v = true
        let Rows = []

        this.identifier.query(`SELECT * FROM ${table_name}`, (err, rows) => {
            if (err) {
                throw err;
            }
            while_v = false
            Rows.push(rows);
        })

        while(while_v) {
            await sleep(10)
        }

        return Rows[0];
    }

    async get_row(table_name, key_name, key_value) {
        let while_v = true
        let Rows = []

        this.identifier.query(`SELECT * FROM ${table_name} WHERE ${key_name} = ${key_value}`, (err, rows) => {
            if (err) throw err;
            while_v = false
            Rows.push(rows);
        })

        while(while_v) {
            await sleep(10)
        }

        return Rows[0][0];
    }

    async create_row(table_name, values_keys, values) {
        let while_v = true
        let code = []

        this.identifier.query(`INSERT IGNORE INTO ${table_name} (${values_keys}) VALUES (${values})`, (err, rows) => {
            if (err) throw err;
            code.push({
                text: 'Done!', 
                value: true,
                data: [values]
            })
            while_v = false
        })

        while(while_v) {
            await sleep(10)
        }
        return code[0];
    }

    async update_row(table_name, set_value, value, key_name, key_value) {
        let while_v = true
        let code = []

        this.identifier.query(`UPDATE IGNORE ${table_name} SET ${set_value} = '${value}' WHERE ${key_name} = ${key_value}`, (err, rows) => {
            if (err) throw err;
            this.identifier.query(`SELECT * FROM ${table_name} WHERE ${key_name} = ${key_value}`, (err, rows) => {

                code.push({
                    text: 'Done!', 
                    value: true,
                    data: rows[0]
                })
                while_v = false
            })
        })
        
        while(while_v) {
            await sleep(10)
        }

        return code[0];
    }

    async delete_row(table_name, key_name, key_value) {
        let while_v = true
        let code = []

        this.identifier.query(`DELETE IGNORE FROM ${table_name} WHERE ${key_name} = ${key_value}`, (err, rows) => {
            if (err) throw err;
            code.push({
                text: 'Done!', 
                value: true,
                data: undefined
            })
            while_v = false
        })

        while(while_v) {
            await sleep(10)
        }

        return code[0];
    }

    async query(query) {
        let while_v = true
        let Rows = []

        this.identifier.query(query, (err, rows) => {
            if (err) {
                throw err;
            }
            while_v = false
            Rows.push(rows);
        })

        while(while_v) {
            await sleep(10)
        }

        return Rows[0];
    }
}

function log(msg, toggle, color_) {
    let color = color_ ? color_ : 'white';

    if(toggle) {
        console.log(colors[color](msg));
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = db_handler