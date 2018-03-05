var express = require('express');
var router = express.Router();
var watchmakersRepository = require('../repositories/watchmakersRepository');

router.get('/', function (req, res) {
    watchmakersRepository.getAll().then((models) => {
        res.json(models);
    });
});

module.exports = router;