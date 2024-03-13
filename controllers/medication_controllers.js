const express = require('express');
const medicationCollection = require('../models/medication');
const router = express.Router();


router.get("/medication", async (req, res) => {
    try {
        const data = await medicationCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;