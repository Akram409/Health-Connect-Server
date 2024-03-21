const express = require('express');
const doctorDataCollection = require('../models/doctorData');
const router = express.Router();


router.get("/doctorData", async (req, res) => {
    try {
        const data = await doctorDataCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

router.get("/doctorData/type/:name", async (req, res) => {
    const appointmentType = req.params.name;
    try {
        const doctors = await doctorDataCollection.find({ type: appointmentType }).toArray();
        res.json(doctors);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
});


module.exports = router;