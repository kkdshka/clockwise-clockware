const express = require('express');
const router = express.Router();
const path = require('path');
const reservationsRepository = require('../repositories/reservationsRepository');
const tokenLifetimeRepository = require('../repositories/tokenLifetimesRepository');
const clientRepository = require('../repositories/clientsRepository');
const sendEmail = require('../sender');
const auth = require('../authenticationAdminMiddleware');
const validation = require('../validation');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const Sequelize = require('sequelize');
require('dotenv').config();

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/reservations-data', async function (req, res) {
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

router.get('/:id', async function (req, res) {
    try {
        const reservation = await reservationsRepository.getById(req.query.id);
        res.status(200).json(reservation);
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
        return;
    }

    try {
        const clientId = await clientRepository.add(reservationData);
        reservationData.client_id = clientId;

        const reservationId = await reservationsRepository.add(reservationData);
        sendEmail(reservationData.email, reservationData.emailMessage);

        const taskMoment = moment.tz(reservationData.finish_time, reservationData.timezone).add(1, 'hour').format();
        const taskDate = new Date(taskMoment);

        const host = req.get('host');
        const salt = process.env.TOKEN_SALT;
        const token = Buffer.from(String(salt + reservationId)).toString('base64');
        const link = 'http://' + host + '/feedback?token=' + token;
        const tokenLifetimeEnd = moment.tz(taskMoment, reservationData.timezone).add(1, 'day').format();

        await tokenLifetimeRepository.addToken({
            token: token,
            lifetime_end: tokenLifetimeEnd
        });

        const task = schedule.scheduleJob(taskDate, function () {
            sendEmail(reservationData.email, reservationData.feedbackEmailMessage + link);
        });

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
        res.sendStatus(200).end();
    }
    catch (error) {
        if (error instanceof Sequelize.ForeignKeyConstraintError) {
            res.status(409).send("Foreign key constraint error").end();
        }
        else {
            console.log(error);
            res.sendStatus(500).end();
        }
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
    return errors;
}

module.exports = router;