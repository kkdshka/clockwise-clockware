const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../authenticationMiddleware');
const feedbacksRepository = require('../repositories/feedbacksRepository');
const tokenLifetimeRepository = require('../repositories/tokenLifetimesRepository');
const feedbackService = require('../feedbackService');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', async function (req, res) {
    try {
        await feedbacksRepository.getAll().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.get('/10last', async function(req, res) {
    try {
        await feedbacksRepository.getTenLast().then((models) => {
            res.status(200).json(models);
        })
    }
    catch(error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const feedbackData = req.body;

    try {
        await feedbacksRepository.add(feedbackData);
        await feedbackService.changeWatchmakersRating(feedbackData.watchmaker_id);
        const tokenLifetime = await tokenLifetimeRepository.getTokenLifetime(feedbackData.token);
        tokenLifetime.is_used = true;
        await tokenLifetimeRepository.updateToken(tokenLifetime);
        res.sendStatus(201).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

module.exports = router;