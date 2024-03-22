const client = require("../client/mongo");

const doctorDataCollection = client.db("healthconnect").collection("doctorData");
module.exports = doctorDataCollection;