const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
    req.session.destroy();
    res.sendStatus(200);
    console.log("logout success!");
});

module.exports = router;