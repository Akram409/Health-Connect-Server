const client = require("../client/mongo");

const userCollection = client.db("utility").collection("user");
module.exports = userCollection;







