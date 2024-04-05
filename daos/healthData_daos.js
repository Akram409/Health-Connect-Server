const mongoose = require("mongoose");

const healthDataSchema = mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  data: [
    {
      month: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        required: true,
      },
      heartRate: {
        type: Number,
        required: true,
      },
      bloodPressure: {
        systolic: {
          type: Number,
          required: true,
        },
        diastolic: {
          type: Number,
          required: true,
        },
      },
      oxygenLevel: {
        type: Number,
        required: true,
      },
      bmi: {
        height: {
          type: Number,
          required: true,
        },
        weight: {
          type: Number,
          required: true,
        },
      },
    },
  ]
});

module.exports = healthDataSchema;
