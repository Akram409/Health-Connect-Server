const client = require("../client/mongo");

const billsCollection = client.db("utility").collection("bills");
module.exports = billsCollection;