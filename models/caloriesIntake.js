const client = require("../client/mongo");

const caloriesIntakeCollection = client.db("utility").collection("caloriesIntake");
module.exports = caloriesIntakeCollection;