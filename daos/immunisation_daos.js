const mongoose = require('mongoose');

const immunisationSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  vaccine_name: {
    type: String,
    required: true
  },
  administration_date: {
    type: String,
    required: true
  },
  dose_number: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  }
});

module.exports = immunisationSchema;
