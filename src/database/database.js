const mysql = require('mysql2')

global.database = mysql.createConnection({
    host: process.env.db_host,
    user: process.env.db_user,
    password: '#$12Punisher23$$#%',
    database: process.env.db
});