const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname+"/../.env" });

// console.log(require("dotenv").config({ path: __dirname+"/../../.env" }))
// console.log("MONGO_URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
