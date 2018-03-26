const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'db4free.net',
    acquireTimeout: 30000,
    port: 3306,
    user: 'kkdshka',
    password: '6e7c9f',
    database: 'kkdshka_test'
});

module.exports = pool;