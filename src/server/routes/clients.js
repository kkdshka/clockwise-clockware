const express = require('express');
const router = express.Router();
const path = require('path');
const clientsRepository = require('../repositories/clientsRepository');

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', function (req, res) {
    clientsRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.post('/', function (req, res) {
    const clientsData = {
        name: req.body.name,
        city: req.body.city,
        email: req.body.email
    };
    clientsRepository.add(clientsData);
    clientsRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.put('/', function (req, res) {
    const clientData = {
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        id: req.body.id
    };
    clientsRepository.edit(clientData);
    clientsRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.delete('/', function (req, res) {
    const id = req.body.id;
    clientsRepository.delete(id);
    clientsRepository.getAll().then((models) => {
        res.json(models);
    });
});
module.exports = router;