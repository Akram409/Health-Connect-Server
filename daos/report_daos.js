const mongoose = require('mongoose');

const reportSchema =  mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  health_report: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  }
});


module.exports = reportSchema;
