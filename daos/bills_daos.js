const mongoose = require("mongoose");

const billSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  billDate: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  cluster: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

module.exports = billSchema;
