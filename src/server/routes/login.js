const express = require('express');
const router = express.Router();

router.post('/', function (req, res) {
    if (req.body.login === "admin@example.com" && req.body.password === "passwordsecret") {
        req.session.user = "admin@example.com";
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