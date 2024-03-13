const express = require('express');
const reportCollection = require('../models/report');
const router = express.Router();


router.get("/reports", async (req, res) => {
    try {
        const data = await reportCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;