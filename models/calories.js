const client = require("../client/mongo");

const caloriesCollection = client.db("healthconnect").collection("calories");
module.exports = caloriesCollection;