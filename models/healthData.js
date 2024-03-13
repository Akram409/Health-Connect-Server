const client = require("../client/mongo");

const healthDataCollection = client.db("utility").collection("healthData");
module.exports = healthDataCollection;