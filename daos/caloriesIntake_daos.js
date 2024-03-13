const mongoose = require('mongoose');

const calorieIntakeSchema =  mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  }
});


module.exports = calorieIntakeSchema;
