const mongoose = require("mongoose");

const totalBillSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  totalBill: {
    type: Number,
    required: true,
  },
});

module.exports = totalBillSchema;

  