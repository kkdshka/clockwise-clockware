function auth(req, res, next) {
    // return next();
    if (req.session && req.session.user === "admin@example.com" && req.session.admin) {
        return next();
    }
    else {
        return res.redirect('/login');
    }
}

module.exports = auth;