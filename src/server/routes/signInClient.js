const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../models');
const Client = db.client;
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/', (req, res) => {
    Client.findOne({where: {email: req.body.email}}).then(client => {
        bcrypt.compare(req.body.password, client.password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    failed: 'Unauthorized Access',
                    error: err
                });
            }
            if (result) {
                const JWTToken = jwt.sign({
                        email: client.email,
                        id: client.id
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '2h'
                    });
                return res.status(200).cookie('token', JWTToken, { httpOnly: true })
                    .cookie('isAuthorized', 'true').end();
            }
            return res.status(401).json({
                failed: 'Unauthorized Access',
                error: 'No users found'
            });
        });
    }).catch(error => {
        res.status(500).json({
            error: error
        });
    });
});

module.exports = router;