const express = require('express');
const router = express.Router();
const path = require('path');
const clientsRepository = require('../repositories/clientsRepository');
const auth = require('../authenticationMiddleware');
const validation = require('../validation');
const Sequelize = require('sequelize');

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/clients-data', async function (req, res) {
    try {
        await clientsRepository.getAll().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.post('/', async function (req, res) {
    const clientData = {
        name: req.body.name,
        email: req.body.email
    };

    const errors = check(clientData);
    if (errors.length > 0) {
        res.sendStatus(400).json({errors: errors});
        return;
    }

    try {
        await clientsRepository.add(clientData);
        res.sendStatus(201).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const clientData = {
        name: req.body.name,
        email: req.body.email,
        id: req.body.id
    };

    const errors = check(clientData);
    if (errors.length > 0) {
        res.sendStatus(400).json({errors: errors});
        return;
    }

    try {
        await clientsRepository.edit(clientData);
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
        await clientsRepository.delete(id);
        res.sendStatus(204).end();
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

function check(clientData) {
    const errors = [];
    if (!validation.isValidName(clientData.name)) {
        errors.push('Invalid name');
    }
    if (!validation.isValidEmail(clientData.email)) {
        errors.push('Invalid email');
    }
    return errors;
}

module.exports = router;