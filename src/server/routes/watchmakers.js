var express = require('express');
var router = express.Router();
var watchmakersRepository = require('../repositories/watchmakersRepository');

router.get('/', function (req, res) {
    watchmakersRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.post('/', function (req, res) {
    const watchmakerData = {
        name: req.body.name,
        city: req.body.city,
        rating: req.body.rating
    };
    watchmakersRepository.add(watchmakerData);
    watchmakersRepository.getAll().then((models) => {
        res.json(models);
    });
});

module.exports = router;