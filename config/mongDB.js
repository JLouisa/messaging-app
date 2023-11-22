const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const mongoDB = process.env.MONGODB_LINK;

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoDB);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
};

module.exports = { connectToDatabase };
