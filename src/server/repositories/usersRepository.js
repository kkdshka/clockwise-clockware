const db = require('../models');
const User = db.user;

function getAllUsers() {
    return User.findAll();
}

module.exports = {
    getAllUsers: getAllUsers
};