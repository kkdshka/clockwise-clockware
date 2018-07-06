const db = require('./models');
const Client = db.client;
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function auth(req, res, next) {
    if (!req.cookies) {
        return res.status(401).redirect('/sign-in');
    }
    const token = req.cookies.token;

    // decode the token using a secret key-phrase
    return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).redirect('/sign-in'); }

        const clientId = decoded.id;

        // check if a user exists
        return Client.findOne({where: {id: clientId}}).then((client) => {
            if (client) {
                return next();
            }
            return res.status(401).redirect('/sign-in');
        });
    });
}

module.exports = auth;