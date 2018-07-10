const express = require('express');
const router = express.Router();
const path = require('path');
const tokenLifetimeRepository = require('../repositories/tokenLifetimesRepository');
const clientRepository = require('../repositories/clientsRepository');
const sendEmail = require('../sender');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.get('/recover', async function (req, res) {
        try {
            const token = await tokenLifetimeRepository.getTokenLifetime(req.query.token);

            if (moment(token.lifetime_end).isAfter(moment()) && !token.is_used) {
                res.sendFile(path.join(__dirname, "../../../index.html"));
            }
            else {
                res.redirect('/notFound');
            }
        } catch (error) {
            res.sendStatus(404);
            console.log(error)
        }
    }
);

router.post('/send-link', async function (req, res) {
    const recoveryData = req.body;

    try {
        const client = await clientRepository.getByEmail(recoveryData.email);

        if (client.password) {
            const host = req.get('host');
            const token = jwt.sign({
                    email: client.email,
                    id: client.id
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: '1h'
                });

            const tokenLifetimeEnd = moment().add(1, 'hour').format();

            await tokenLifetimeRepository.addToken({
                token: token,
                lifetime_end: tokenLifetimeEnd
            });

            const link = 'http://' + host + '/password-recovery/recover?token=' + token;
            const message = recoveryData.message + link;

            sendEmail(recoveryData.email, message);
            res.sendStatus(200).end();
        }
    } catch (error) {
        console.log(error);
    }

});

router.post('/recover', async (req, res) => {
    const clientData = req.body;

    try {
        clientData.password = await bcrypt.hash(clientData.plaintextPassword, 5);
        return jwt.verify(clientData.token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(409).json({error: "token is expired"});
            }
            clientData.id = decoded.id;
            return clientRepository.edit(clientData).then(() => {
                return res.sendStatus(204);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error});
    }
});

module.exports = router;