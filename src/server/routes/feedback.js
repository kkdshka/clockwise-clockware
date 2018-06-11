const express = require('express');
const router = express.Router();
const path = require('path');
const tokenLifetimeRepository = require('../repositories/tokenLifetimesRepository');
const moment = require('moment');

router.get('/', async function (req, res) {
    try {
        const token = await tokenLifetimeRepository.getTokenLifetime(req.query.token);

        if (moment(token.lifetime_end).isAfter(moment())) {
            res.sendFile(path.join(__dirname, "../../../index.html"));
        }
        else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.sendStatus(404);
        console.log(error)
    }

});

module.exports = router;