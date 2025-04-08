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
    isLoggedIn: {
      type: Boolean,
      required: true,
      default: false,
    },
    blockedUsers:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }
    ]
  },
);

// Mongoose auto-generates a unique `_id` field (which serves as id)
module.exports = mongoose.model("User", userSchema);

// blockedUsers: This is an array of ObjectIds, and those IDs should refer to documents in the User collection.