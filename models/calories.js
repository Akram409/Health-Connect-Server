const client = require("../client/mongo");

const caloriesCollection = client.db("utility").collection("calories");
module.exports = caloriesCollection;