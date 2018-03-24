const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../authenticationMiddleware');

/* GET home page. */
router.get('/*', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

module.exports = router;