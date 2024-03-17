const express = require('express');
const billsCollection = require('../models/bill');
const { ObjectId } = require('mongodb');
const router = express.Router();


router.get("/bills", async (req, res) => {
    try {
        const data = await billsCollection.find().toArray();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});
router.post("/bills/:id", async (req, res) => {
    try {
        const ID = req.params.id;
        const { totalAmount } = req.body;
        // console.log(ID,totalAmount)
        // Update the bill with the provided ID
        const updatedBill = await billsCollection.findOneAndUpdate(
            { _id: new ObjectId(ID) },
            { $set: { totalAmount: totalAmount } },
            { new: true } // To return the updated document
        );

        if (!updatedBill) {
            return res.status(404).json({ error: "Bill not found." });
        }

        // res.json(updatedBill);
    } catch (error) {
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;