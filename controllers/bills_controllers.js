const express = require('express');
const billsCollection = require('../models/bill');
const router = express.Router();


router.get("/bills", async (req, res) => {
    try {
        const data = await billsCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;