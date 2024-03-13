const client = require("../client/mongo");

const immunisationCollection = client.db("utility").collection("immunisation");
module.exports = immunisationCollection;
