const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
const crypto = require("crypto");
const client = require("./client/mongo");
const userController = require("./controllers/user_controllers");
const appointmentController = require("./controllers/appointment_controllers");
const billsController = require("./controllers/bills_controllers");
const caloriesIntakeController = require("./controllers/caloriesIntake_controllers");
const healthDataController = require("./controllers/healthData_controllers");
const immunisationController = require("./controllers/immunisation_controllers");
const reportsController = require("./controllers/reports_controllers");
const medicatoinController = require("./controllers/medication_controllers");
// Middleware
app.use(cors());
app.use(express.json());
require("dotenv").config();

const { MongoClient, ServerApiVersion, ObjectId, Db } = require("mongodb");

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();

    app.use("/", userController);
    app.use("/", appointmentController);
    app.use("/", billsController);
    app.use("/", caloriesIntakeController);
    app.use("/", healthDataController);
    app.use("/", immunisationController);
    app.use("/", reportsController);
    app.use("/", medicatoinController);

    // Generate random secret key
    const generateSecretKey = () => {
      return crypto.randomBytes(32).toString("hex"); // Generates a random 32-byte hexadecimal string
    };
    const secretKey = generateSecretKey();

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
