const express = require("express");
const totalBillCollection = require("../models/totalBill");

const router = express.Router();

router.get("/totalBill", async (req, res) => {
  try {
    const data = await totalBillCollection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/totalBill/:email", async (req, res) => {
  const { email } = req.params;
  const { totalAmount } = req.body;

  try {
    const result = await totalBillCollection.updateOne(
      { email },
      { $inc: { totalBill: totalAmount } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Total bill not found." });
    }

    res.json({ message: "Total bill updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
