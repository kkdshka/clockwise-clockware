require('dotenv').config();

const dbConfig = {
    connectionLimit: 10,
    host: process.env.DB_HOST,
    acquireTimeout: 600000,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
};

const senderConfig = {
    service: 'gmail',
    auth: {
        user: process.env.SENDER_USER_EMAIL,
        pass: process.env.SENDER_USER_PASS
    }
};

module.exports = {
    db: dbConfig,
    sender: senderConfig
};
