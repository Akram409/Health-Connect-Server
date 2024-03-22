const client = require("../client/mongo");

const billsCollection = client.db("healthconnect").collection("bills");
module.exports = billsCollection;