const express = require('express');
const router = express.Router();
const path = require('path');
const reservationsRepository = require('../repositories/reservationsRepository');
const sendEmail = require('../sender');
const auth = require('../authenticationMiddleware');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', function (req, res) {
    reservationsRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.post('/', function (req, res) {
    const reservationData = {
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        clock_size: req.body.clockSize,
        date: req.body.date,
        time: req.body.time,
        watchmaker_id: req.body.watchmakerId
    };
    sendEmail(reservationData.email, reservationData);
    reservationsRepository.add(reservationData);
    reservationsRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.put('/', function (req, res) {
    const reservationData = {
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        clock_size: req.body.clockSize,
        date: req.body.date,
        time: req.body.time,
        watchmaker_id: req.body.watchmakerId,
        id: req.body.id
    };
    reservationsRepository.edit(reservationData);
    reservationsRepository.getAll().then((models) => {
        res.json(models);
    });
});

router.delete('/', function (req, res) {
    const id = req.body.id;
    reservationsRepository.delete(id);
    reservationsRepository.getAll().then((models) => {
        res.json(models);
    });
});
module.exports = router;