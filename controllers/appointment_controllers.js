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
router.post("/appointments", async (req, res) => {
    try {
        // Extract data from the request body
        const { username, doctor_id, appointment_date, appointment_type, status, start_time, notes } = req.body;

        // console.log(req.body)
        // Create a new appointment document
        const newAppointment = {
            username,
            doctor_id,
            appointment_date,
            appointment_type,
            status,
            start_time,
            notes
        };

        // Insert the new appointment into the collection
        await appointmentCollection.insertOne(newAppointment);

        // Respond with success message
        res.status(201).json({ message: "Appointment added successfully" });
    } catch (error) {
        // If any error occurs, respond with an error message
        console.error("Error adding appointment:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;