const express = require('express');
const caloriesIntakeCollection = require('../models/caloriesIntake');
const router = express.Router();


router.get("/caloriesIntake", async (req, res) => {
    try {
        const data = await caloriesIntakeCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;