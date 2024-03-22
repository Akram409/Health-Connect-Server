const client = require("../client/mongo");

const medicationCollection = client.db("healthconnect").collection("medication");
module.exports = medicationCollection;