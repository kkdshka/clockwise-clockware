const express = require('express');
const router = express.Router();
const path = require('path');
const watchmakersRepository = require('../repositories/watchmakersRepository');
const auth = require('../authenticationMiddleware');
const validation = require('../validation');
const Sequelize = require('sequelize');
const cloudinary = require('cloudinary');
const multer = require('multer');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = multer.memoryStorage();
const upload = multer({storage});

router.get('/', auth, function (req, res) {
    res.sendFile(path.join(__dirname, "../../../index.html"));
});

router.get('/watchmakers-data', async function (req, res) {
    try {
        await watchmakersRepository.getAll().then((models) => {
            res.status(200).json(models);
        });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.get('/free-watchmakers', async function (req, res) {
    const data = req.query;

    try {
        await watchmakersRepository.getFreeWatchmakers(data)
            .then((models) => {
                res.status(200).json(models);
            });
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.post('/watchmaker-avatar', upload.single('file'), (req, res) => {
    cloudinary.v2.uploader.unsigned_upload_stream('watchmaker',
        async (error, result) => {
        try {
            await watchmakersRepository.edit({
                id: req.body.id,
                avatar: result.url
            });
            res.sendStatus(204).end(req.file.buffer);
        }
        catch (e) {
            console.log(error);
            res.sendStatus(500).json({error: error});
        }
        }).end(req.file.buffer)
});

router.post('/', async function (req, res) {
    const watchmakerData = req.body;

    if (!validation.isValidWatchmakerName(watchmakerData.name)) {
        res.sendStatus(400).json({error: 'Название города не может быть пустым'});
        return;
    }

    try {
        const watchmaker = await watchmakersRepository.add(watchmakerData);
        res.status(201).send(watchmaker).end();
    }
    catch (error) {
        console.log(error);
        res.sendStatus(500).json({error: error});
    }
});

router.put('/', async function (req, res) {
    const watchmakerData = req.body;

    if (!validation.isValidWatchmakerName(watchmakerData.name)) {
        res.sendStatus(400).json({error: 'Название города не может быть пустым'});
        return;
    }

    try {
        await watchmakersRepository.edit(watchmakerData);
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
        await watchmakersRepository.delete(id);
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

module.exports = router;