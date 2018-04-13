const users = require('./users');

function auth(req, res, next) {
    // return next();
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