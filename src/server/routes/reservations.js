const express = require('express');
const router = express.Router();
const path = require('path');
const reservationsRepository = require('../repositories/reservationsRepository');
const sendEmail = require('../sender');
const auth = require('../authenticationMiddleware');
const validation = require('../validation');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/data', async function (req, res) {
    try {
        await reservationsRepository.getAll().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const reservationData = req.body;
    const errors = check(reservationData);
    if (errors.length > 0) {
        res.sendStatus(400).json({errors: errors});
        console.log(errors);
        return;
    }

    try {
        await reservationsRepository.add(reservationData);
        sendEmail(reservationData.email, reservationData);
        res.sendStatus(201).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const reservationData = req.body;

    const errors = check(reservationData);
    if (errors.length > 0) {
        res.sendStatus(400).json({errors: errors});
        return;
    }

    try {
        await reservationsRepository.edit(reservationData);
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
        await reservationsRepository.delete(id);
        res.sendStatus(204).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
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
    // if (!validation.isValidTime(reservationData.start_time)) {
    //     errors.push('Invalid time');
    // }
    // if (!validation.isValidDate(reservationData.date)) {
    //     errors.push('Invalid date');
    // }
    return errors;
}

module.exports = router;