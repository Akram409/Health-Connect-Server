const client = require("../client/mongo");

const doctorDataCollection = client.db("utility").collection("doctorData");
module.exports = doctorDataCollection;