const mongoose = require('mongoose');

const caloriesSchema =  mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  user_email: {
    type: String,
    required: true
  },
  calories: {
    type: Number,
    required: true
  },
  food: [{
    name: String,
    calories: Number,
    category: String 
  }]
});


module.exports = caloriesSchema;
