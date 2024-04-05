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
  const { date, calories, foodName, category } = req.body;
  console.log(req.body);
  try {
    let existingData = await caloriesCollection.findOne({
      user_email: email,
      date,
    });

    if (existingData) {
      await caloriesCollection.updateOne(
        { user_email: email, date },
        {
          $set: { calories: +(existingData.calories + calories).toFixed(3) },
          $push: {
            food: { name: foodName, calories: +calories.toFixed(3), category },
          },
        }
      );
    } else {
      // If no data exists, insert a new document
      await caloriesCollection.insertOne({
        user_email: email,
        date,
        calories: +calories.toFixed(3),
        food: [{ name: foodName, calories: +calories.toFixed(3), category }], // Include category here
      });
    }

    res.status(200).json({ message: "Calories updated successfully." });
  } catch (error) {
    console.error("Error updating user calorie intake:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

// router.post("/calories/add/food/:email", async (req, res) => {
//   const { email } = req.params;
//   const { date, food } = req.body;

// });
router.put("/calories/remove/:email", async (req, res) => {
  const { email } = req.params;
  const { date, calories, foodName, category } = req.body;

  try {
    // Find the document matching the user's email and date
    let existingData = await caloriesCollection.findOne({
      user_email: email,
      date,
    });

    if (existingData) {
      // Find the index of the food item by its name and calories
      const indexToRemove = existingData.food.findIndex(
        (food) =>
          food.name === foodName &&
          food.calories === calories &&
          food.category === category
      );

      if (indexToRemove !== -1) {
        // Remove the food item from the 'food' array
        existingData.food.splice(indexToRemove, 1);

        // Calculate the new total calories after removing the food item
        const updatedCalories = existingData.calories - calories;

        // Update the document with the modified food array and calories
        await caloriesCollection.updateOne(
          { user_email: email, date },
          { $set: { food: existingData.food, calories: updatedCalories } }
        );

        res.status(200).json({ message: "Calories removed successfully." });
      } else {
        // If the food item was not found in the 'food' array
        res.status(404).json({ error: "Food item not found." });
      }
    } else {
      // If no data exists for the specified email and date
      res
        .status(404)
        .json({ error: "No data found for the specified email and date." });
    }
  } catch (error) {
    console.error("Error removing calories:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

router.get("/calorisData", async (req, res) => {
  try {
    const data = await caloriesCollection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
