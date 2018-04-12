const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    acquireTimeout: 30000,
    port: 3306,
    user: 'admin',
    password: 'passwordsecret',
    database: 'test'
});

module.exports = pool;