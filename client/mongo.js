const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.DB_URI

const client = new MongoClient("mongodb+srv://utility:6FIIMM2Y4fc8fZa8@cluster0.6nxonq0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

module.exports = client;

