const express = require('express');
const router = express.Router();
const users = require('../users');

router.post('/', function (req, res) {
    const authorizedUser = users.filter(user => req.body.login === user.login && req.body.password === user.password);

    if (authorizedUser.length > 0) {
        req.session.user = authorizedUser[0].name;
        req.session.admin = true;
        console.log("login success!");
        res.sendStatus(200);
    }
    else {
        console.log('login failed');
        res.sendStatus(401);
    }
});

module.exports = router;