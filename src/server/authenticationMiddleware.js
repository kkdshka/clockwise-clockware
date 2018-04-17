const usersRepository = require('./repositories/usersRepository');

async function auth(req, res, next) {
    // return next();
    const users = await usersRepository.getAllUsers();
    users.forEach((user) => {
        if (req.session && req.session.user === user.name && req.session.admin) {
            return next();
        }
        else {
            return res.redirect('/login');
        }
    })
}

module.exports = auth;