const express = require("express");
const caloriesCollection = require("../models/calories");

const router = express.Router();

router.post("/user/caloriesData/:email", async (req, res) => {
  const { email } = req.params;
  const { dates } = req.body;
  // console.log(email, dates);
  try {
    // Find data for the specified email and date
    const user = await caloriesCollection
      .find({ user_email: email, date: dates })
      .toArray();

    if (user.length > 0) {
      // If data is found, return the user array
      res.status(200).json(user);
    } else {
      // If no data is found, return an empty array
      res.status(200).json([]);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.post("/calories/:email", async (req, res) => {
  const { email } = req.params;
  const { date, calories } = req.body;

  try {
    let existingData = await caloriesCollection.findOne({
      user_email: email,
      date,
    });

    if (existingData) {
      await caloriesCollection.updateOne(
        { user_email: email, date },
        { $set: { calories: existingData.calories + calories } }
      );
    } else {
      // If no data exists, insert a new document
      await caloriesCollection.insertOne({ user_email: email, date, calories });
    }

    res.status(200).json({ message: "Calories updated successfully." });
  } catch (error) {
    console.error("Error updating user calorie intake:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/calories/remove/:email", async (req, res) => {
  const { email } = req.params;
  const { date, calories } = req.body;

  try {
    let existingData = await caloriesCollection.findOne({
      user_email: email,
      date,
    });

    if (existingData) {
      if (existingData.calories >= calories) {
        // Subtract provided calories from the existing calories
        const updatedCalories = existingData.calories - calories;
        
        // Update the document with the new calories value
        await caloriesCollection.updateOne(
          { user_email: email, date },
          { $set: { calories: updatedCalories } }
        );

        res.status(200).json({ message: "Calories removed successfully." });
      } else {
        res.status(400).json({ error: "Insufficient calories to subtract." });
      }
    } else {
      // If no data exists for the specified email and date, return a message
      res.status(404).json({ error: "No data found for the specified email and date." });
    }
  } catch (error) {
    console.error("Error removing calories:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});



module.exports = router;
