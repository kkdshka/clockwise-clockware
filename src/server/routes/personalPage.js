const express = require('express');
const router = express.Router();
const path = require('path');
const auth = require('../authenticationClientMiddleware');
const jwt = require('jsonwebtoken');
const reservationRepository = require('../repositories/reservationsRepository');

/* GET home page. */
router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/clients-reservations', auth, (req, res) => {
    const token = req.cookies.token;
    const clientEmail = jwt.verify(token, process.env.JWT_SECRET).email;

    try {
        reservationRepository.getByEmail(clientEmail).then((reservations) => {
            res.status(200).json(reservations);
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

module.exports = router;