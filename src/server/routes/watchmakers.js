const express = require('express');
const router = express.Router();
const path = require('path');
const watchmakersRepository = require('../repositories/watchmakersRepository');
const FreeWatchmakers = require('../services/freeWatchmakersService');
const auth = require('../authenticationMiddleware');
const validation = require('../validation');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', async function (req, res) {
    try {
        await watchmakersRepository.getAll().then((models) => {
            console.log(models);
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.get('/free-watchmakers', async function (req, res) {
    const data = (new FreeWatchmakers(req.query)).data;
    try {
        await watchmakersRepository.getFreeWatchmakers(data)
            .then((models) => {
                console.log(models);
                res.status(200).json(models);
            });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const watchmakerData = {
        name: req.body.name,
        city_id: req.body.city_id,
        rating: req.body.rating
    };

    if (!validation.isValidWatchmakerName(watchmakerData.name)) {
        res.sendStatus(400).json({error: 'Название города не может быть пустым'});
        return;
    }

    try {
        await watchmakersRepository.add(watchmakerData);
        res.status(201);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const watchmakerData = {
        name: req.body.name,
        city_id: req.body.city_id,
        rating: req.body.rating,
        id: req.body.id
    };

    if (!validation.isValidWatchmakerName(watchmakerData.name)) {
        res.sendStatus(400).json({error: 'Название города не может быть пустым'});
        return;
    }

    try {
        await watchmakersRepository.edit(watchmakerData);
        res.status(204);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.delete('/', async function (req, res) {
    const id = req.body.id;
    try {
        await watchmakersRepository.delete(id);
        res.status(204);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

module.exports = router;