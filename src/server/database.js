var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'admin',
    password: 'passwordsecret',
    database: 'test'
});

//class Database {
//    constructor() {
//        this.connection = mysql.createConnection({
//            host: 'localhost',
//            user: 'admin',
//            password: 'passwordsecret',
//            database: 'test'
//        });
//    }
//    query(sql, args) {
//        return new Promise((resolve, reject) => {
//            this.connection.query(sql, args, (err, rows) => {
//                if (err)
//                    return reject(err);
//                resolve(rows);
//            });
//        });
//    }
//    close() {
//        return new Promise((resolve, reject) => {
//            this.connection.end(err => {
//                if (err)
//                    return reject(err);
//                resolve();
//            });
//        });
//    }
//}

//module.exports = Database;
module.exports = pool;