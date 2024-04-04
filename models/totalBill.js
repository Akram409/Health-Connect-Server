const client = require("../client/mongo");

const totalBillCollection = client.db("healthconnect").collection("totalBill");
module.exports = totalBillCollection;