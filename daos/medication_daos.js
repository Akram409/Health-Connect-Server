const mongoose = require('mongoose');

const medicationSchema =  mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    usage: {
        type: String,
        required: true
    }
});


module.exports = medicationSchema;