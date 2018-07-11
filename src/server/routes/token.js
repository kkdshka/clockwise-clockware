const express = require('express');
const router = express.Router();
const path = require('path');
const tokenLifetimeRepository = require('../repositories/tokenLifetimesRepository');

router.delete('/', async (req, res) => {
    const token = req.body.token;

    try {
        const tokenLifetime = await tokenLifetimeRepository.getTokenLifetime(token);
        tokenLifetime.is_used = true;
        return tokenLifetimeRepository.updateToken(tokenLifetime).then(() => {
            return res.sendStatus(204);
        });
    } catch(error) {
        res.status(500).json({error: error})
    }

});

module.exports = router;