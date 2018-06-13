const db = require('../models');
const User = db.user;

function getAllUsers() {
    return User.findAll()
        .catch(error => console.log(error));
}

module.exports = {
    getAllUsers: getAllUsers
};