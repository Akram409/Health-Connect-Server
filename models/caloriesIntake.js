const client = require("../client/mongo");

const caloriesIntakeCollection = client.db("healthconnect").collection("caloriesIntake");
module.exports = caloriesIntakeCollection;