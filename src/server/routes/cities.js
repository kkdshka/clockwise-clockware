const express = require('express');
const router = express.Router();
const path = require('path');
const citiesRepository = require('../repositories/citiesRepository');
const auth = require('../authenticationMiddleware');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', function (req, res) {
    citiesRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.post('/', function (req, res) {
    const cityData = {
        name: req.body.name
    };
    citiesRepository.add(cityData);
    citiesRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.put('/', function (req, res) {
    const cityData = {
        name: req.body.name,
        id: req.body.id
    };
    citiesRepository.edit(cityData);
    citiesRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.delete('/', function (req, res) {
    const id = req.body.id;
    citiesRepository.delete(id);
    citiesRepository.getAll().then((models) => {
        res.json(models);
    });
});
module.exports = router;