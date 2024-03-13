const express = require('express');
const healthDataCollection = require('../models/healthData');
const router = express.Router();


router.get("/healthData", async (req, res) => {
    try {
        const data = await healthDataCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;