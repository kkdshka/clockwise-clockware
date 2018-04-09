const express = require('express');
const router = express.Router();
const path = require('path');
const citiesRepository = require('../repositories/citiesRepository');
const auth = require('../authenticationMiddleware');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', async function (req, res) {
    try {
        await citiesRepository.getAll().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const cityData = {
        name: req.body.name
    };
    try {
        await citiesRepository.add(cityData);
        res.status(201);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const cityData = {
        name: req.body.name,
        id: req.body.id
    };
    try {
        await citiesRepository.edit(cityData);
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
        await citiesRepository.delete(id);
        res.status(204);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

module.exports = router;