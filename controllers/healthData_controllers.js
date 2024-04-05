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

router.get("/healthData/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const data = await healthDataCollection.findOne({ userEmail: email });
    if (!data) {
      // If no data found with the given ID
      return res.status(404).json({ error: "Data not found." });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

router.put("/healthDatas/:email", async (req, res) => {
  const userEmail = req.params.email;
  const { newData, month } = req.body;

  function getMonthNumber(monthName) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    return months.indexOf(monthName) + 1;
  }

  try {
    let userHealthData = await healthDataCollection.findOne({
      userEmail: userEmail,
    });

    if (!userHealthData) {
      // Create a new user object with 12 months data fields
      const emptyUserData = {
        userEmail,
        data: Array.from({ length: 12 }, (_, index) => ({
          month: getMonthNumber(index + 1),
          timestamp: new Date(),
          heartRate: null,
          bloodPressure: {
            systolic: null,
            diastolic: null,
          },
          oxygenLevel: null,
          bmi: {
            height: null,
            weight: null,
          },
        })),
      };

      // Merge the new data with the empty user data
      userHealthData = { ...emptyUserData, ...newData };

      // Insert the new user
      await healthDataCollection.insertOne(userHealthData);
      return res.status(201).json({ message: "New user Updated." });
    }

    const monthIndex = getMonthNumber(month) - 1;

    if (monthIndex >= 0 && monthIndex < userHealthData.data.length) {
      const monthData = userHealthData.data[monthIndex];

      if (newData.bloodPressure) {
        monthData.bloodPressure = {
          ...monthData.bloodPressure,
          ...newData.bloodPressure,
        };
      }
      if (newData.bmi) {
        monthData.bmi = { ...monthData.bmi, ...newData.bmi };
      }
      if (newData.heartRate) {
        monthData.heartRate = newData.heartRate;
      }
      if (newData.oxygenLevel) {
        monthData.oxygenLevel = newData.oxygenLevel;
      }

      // Save the updated health data
      await healthDataCollection.updateOne(
        { userEmail: userEmail },
        { $set: { [`data.${monthIndex}`]: monthData } }
      );

      res.json({ message: "Health data updated successfully." });
    } else {
      res.status(400).json({ error: "Invalid month provided." });
    }
  } catch (error) {
    console.error("Error updating health data:", error);
    res.status(500).json({ error: "Internal server error." });
  }
});


module.exports = router;
