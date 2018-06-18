const express = require('express');
const router = express.Router();
const path = require('path');
const citiesRepository = require('../repositories/citiesRepository');
const auth = require('../authenticationMiddleware');
const validation = require('../validation');
const Sequelize = require('sequelize');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/cities-data', async function (req, res) {
    try {
        await citiesRepository.getCities().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.get('/translations', async function (req, res) {
    try {
        const models = await citiesRepository.getTranslations();
        res.status(200).json(models);
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const cityData = req.body;

    if (!validation.isValidCityName(cityData.name)) {
        res.sendStatus(400).json({error: "Имя не может быть пустым"});
        return;
    }

    try {
        const cityId = await citiesRepository.addCity(cityData);
        cityData.translations.forEach((translation) => {
            translation.city_id = cityId;
        });
        await citiesRepository.addTranslations(cityData.translations);
        res.sendStatus(201).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const cityData = req.body;

    if (!validation.isValidCityName(cityData.name)) {
        res.sendStatus(400).json({error: "Имя не может быть пустым"});
        return;
    }

    try {
        await citiesRepository.editTranslations(cityData.translations);
        await citiesRepository.editCity(cityData);
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
        await citiesRepository.deleteCity(id);
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