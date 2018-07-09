const express = require('express');
const router = express.Router();
const path = require('path');
const tokenLifetimeRepository = require('../repositories/tokenLifetimesRepository');
const clientRepository = require('../repositories/clientsRepository');
const sendEmail = require('../sender');
const schedule = require('node-schedule');
const moment = require('moment-timezone');

router.post('/send-link', async function (req, res) {
    const recoveryData = req.body;
    res.sendStatus(200).end();

});

module.exports = router;