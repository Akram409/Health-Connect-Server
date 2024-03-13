const client = require("../client/mongo");

const appointmentCollection = client.db("utility").collection("appointment");
module.exports = appointmentCollection;