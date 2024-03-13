const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
  doctor_id: {
    type: String,
    required: true
  },
  appointment_date: {
    type: String,
    required: true
  },
  start_time: {
    type: String,
    required: true
  },
  appointment_type: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Scheduled', 'Cancelled', 'Completed'], // Assuming these are the possible statuses
    required: true
  },
  notes: {
    type: String
  },
  username: {
    type: String,
    required: true
  }
});


module.exports = appointmentSchema;
