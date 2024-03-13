const client = require("../client/mongo");

const reportCollection = client.db("utility").collection("report");
module.exports = reportCollection;
