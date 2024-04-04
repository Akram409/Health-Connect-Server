const express = require("express");
const healthDataCollection = require("../models/healthData");
const router = express.Router();

router.get("/healthData", async (req, res) => {
  try {
    const data = await healthDataCollection.find().toArray();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/healthData/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newData = req.body;

  try {
    let userHealthData = await healthDataCollection.findOne({ userId: userId });

    console.log("users", newData);

    if (!userHealthData) {
      // Create a new user object with empty fields
      const emptyUserData = {
        userId,
        timestamp: new Date().toISOString(),
        heartRate: null,
        bloodPressure: { systolic: null, diastolic: null },
        oxygenLevel: null,
        bmi: { height: null, weight: null },
      };

      // Merge the new data with the empty user data
      userHealthData = { ...emptyUserData, ...newData };

      // Insert the new user
      await healthDataCollection.insertOne(userHealthData);
      return res.status(201).json({ message: "New user Updated." });
    }

    if (newData.bloodPressure) {
        userHealthData.bloodPressure = {
          ...userHealthData.bloodPressure,
          ...newData.bloodPressure,
        };
      }
    if (newData.bmi) {
        userHealthData.bmi = { ...userHealthData.bmi, ...newData.bmi };
      }
    if (newData.heartRate) {
        userHealthData.heartRate = newData.heartRate;
      }
    if (newData.oxygenLevel) {
        userHealthData.oxygenLevel = newData.oxygenLevel;
      }

    //   userHealthData = { ...userHealthData, ...newData };
    // Save the updated health data
    await healthDataCollection.updateOne(
        { userId: userId }, 
        { $set: userHealthData }
      );

    res.json({ message: "Health data updated successfully." });
  } catch (error) {
    console.error("Error updating health data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
