const User = require('../models/userModel');
const pool = require('../database');

function getAllUsers() {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM users", (error, results) => {
            if (error) {
                return reject(error);
            }
            const models = results.map((result) => {
                return new User(result.login, result.password, result.id);
            });
            resolve(models);
        });
    });
}

module.exports = {
    getAllUsers: getAllUsers
};