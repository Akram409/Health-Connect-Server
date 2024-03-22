const client = require("../client/mongo");

const reportCollection = client.db("healthconnect").collection("report");
module.exports = reportCollection;
