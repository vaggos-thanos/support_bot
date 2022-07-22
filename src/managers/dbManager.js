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
            await sleep(1000)
        }

        return db;
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
            await sleep(1000)
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
            await sleep(1000)
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
            await sleep(1000)
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
            await sleep(1000)
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
            await sleep(1000)
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
            await sleep(1000)
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