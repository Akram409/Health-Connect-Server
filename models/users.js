const client = require("../client/mongo");

const userCollection = client.db("healthconnect").collection("user");
module.exports = userCollection;







