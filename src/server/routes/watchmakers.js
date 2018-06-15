const express = require('express');
const router = express.Router();
const path = require('path');
const watchmakersRepository = require('../repositories/watchmakersRepository');
const auth = require('../authenticationMiddleware');
const validation = require('../validation');
const Sequelize = require('sequelize');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', async function (req, res) {
    try {
        await watchmakersRepository.getAll().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.get('/free-watchmakers', async function (req, res) {
    const data = req.query;

    try {
        await watchmakersRepository.getFreeWatchmakers(data)
            .then((models) => {
                res.status(200).json(models);
            });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
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
        res.sendStatus(201).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
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
        res.sendStatus(204).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.delete('/', async function (req, res) {
    const id = req.body.id;
    try {
        await watchmakersRepository.delete(id);
        res.sendStatus(204).end();
    }
    catch (error) {
        if (error instanceof Sequelize.ForeignKeyConstraintError) {
            res.status(500).send("Foreign key constraint error").end();
        }
        else {
            console.log(error);
            res.sendStatus(500).end();
        }
    }
});

module.exports = router;