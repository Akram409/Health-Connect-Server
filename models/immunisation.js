const client = require("../client/mongo");

const immunisationCollection = client.db("healthconnect").collection("immunisation");
module.exports = immunisationCollection;
