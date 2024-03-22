const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const uri = process.env.DB_URI

const client = new MongoClient(
  "mongodb+srv://healthconnect:3uZ4tw0dPEgeIYrF@cluster0.ikrk2qt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  }
);

module.exports = client;
