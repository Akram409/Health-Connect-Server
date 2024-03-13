const express = require('express');
const immunisationCollection = require('../models/immunisation');
const router = express.Router();


router.get("/immunisation", async (req, res) => {
    try {
        const data = await immunisationCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;