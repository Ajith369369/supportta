const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String, // Store the URL or file path of the profile photo
      default: "", // You can set a default profile photo if needed
    },
  },
);

// Mongoose auto-generates a unique `_id` field (which serves as id)
module.exports = mongoose.model("User", userSchema);
