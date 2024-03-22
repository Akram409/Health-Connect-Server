const client = require("../client/mongo");

const healthDataCollection = client.db("healthconnect").collection("healthData");
module.exports = healthDataCollection;