const express = require('express');
const router = express.Router();
const path = require('path');
const reservationsRepository = require('../repositories/reservationsRepository');
const sendEmail = require('../sender');
const auth = require('../authenticationMiddleware');
const getFinishTime = require('../models/timeHelper').getFinishTime;
const validation = require('../validation');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', async function (req, res) {
    try {
        await reservationsRepository.getAll().then((models) => {
            res.json(models);
        });
        res.status(200);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const reservationData = {
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        clock_size: req.body.clockSize,
        date: req.body.date,
        time: req.body.time,
        watchmaker_id: req.body.watchmakerId,
        end_time: getFinishTime(req.body.time, req.body.clockSize)
    };

    const errors = check(reservationData);
    if (errors.length > 0) {
        res.status(422).json({errors: errors});
        return;
    }

    try {
        await reservationsRepository.add(reservationData);
        sendEmail(reservationData.email, reservationData);
        res.send(201);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const reservationData = {
        name: req.body.name,
        city: req.body.city,
        email: req.body.email,
        clock_size: req.body.clockSize,
        date: req.body.date,
        time: req.body.time,
        watchmaker_id: req.body.watchmakerId,
        end_time: getFinishTime(req.body.time, req.body.clockSize),
        id: req.body.id
    };

    const errors = check(reservationData);
    if (errors.length > 0) {
        res.status(422).json({errors: errors});
        return;
    }

    try {
        await reservationsRepository.edit(reservationData);
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
        await reservationsRepository.delete(id);
        res.status(204);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

function check(reservationData) {
    const errors = [];
    if (!validation.isValidName(reservationData.name)) {
        errors.push('Invalid name');
    }
    if (!validation.isValidEmail(reservationData.email)) {
        errors.push('Invalid email');
    }
    if (!validation.isValidTime(reservationData.time)) {
        errors.push('Invalid time');
    }
    if (!validation.isValidDate(reservationData.date)) {
        errors.push('Invalid date');
    }
    return errors;
}

module.exports = router;