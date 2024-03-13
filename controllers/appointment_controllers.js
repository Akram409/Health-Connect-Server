const express = require('express');
const appointmentCollection = require('../models/appointment');
const router = express.Router();


router.get("/appointments", async (req, res) => {
    try {
        const data = await appointmentCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;