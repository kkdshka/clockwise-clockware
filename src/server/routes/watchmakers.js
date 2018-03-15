const express = require('express');
const router = express.Router();
const path = require('path');
const watchmakersRepository = require('../repositories/watchmakersRepository');
const FreeWatchmakers = require('../models/freeWatchmakersService');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', function (req, res) {
    watchmakersRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.get('/free-watchmakers',  function (req, res) {
    (new FreeWatchmakers(req.params)).getAll().then((models) => {
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

router.put('/', function (req, res) {
    const watchmakerData = {
        name: req.body.name,
        city: req.body.city,
        rating: req.body.rating,
        id: req.body.id
    };
    watchmakersRepository.edit(watchmakerData);
    watchmakersRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.delete('/', function (req, res) {
    const id = req.body.id;
    watchmakersRepository.delete(id);
    watchmakersRepository.getAll().then((models) => {
        res.json(models);
    });
});
module.exports = router;