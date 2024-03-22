const client = require("../client/mongo");

const appointmentCollection = client.db("healthconnect").collection("appointment");
module.exports = appointmentCollection;