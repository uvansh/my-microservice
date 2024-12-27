const express = require('express');
const router = express.Router();
const Data = require('../models/data');

router.get('/', async (req, res) => {
    try {
        const data = await Data.find();
        res.status(201).send(data);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/data', async (req, res) => {
    const data = new Data(req.body);
    try {
        await data.save();
        res.status(201).send({ message: 'Data received', data });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.put('/data/:id', async (req, res) => {
    try {
        const data = await Data.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!data) {
            return res.status(404).send();
        }
        res.send({ message: `Data with id ${req.params.id} updated`, data });
    } catch (err) {
        res.status(400).send(err);
    }
});

// DELETE data by ID
router.delete('/data/:id', async (req, res) => {
    try {
        const data = await Data.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).send();
        }
        res.send({ message: `Data with id ${req.params.id} deleted` });
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;