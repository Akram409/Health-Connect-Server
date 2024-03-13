const client = require("../client/mongo");

const medicationCollection = client.db("utility").collection("medication");
module.exports = medicationCollection;