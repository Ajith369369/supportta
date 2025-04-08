const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    brandLogo: {
      type: String, // URL or file path
      default: "",
    },
    categories: {
      type: [String], // Array of category names
      default: [],
    },
  }
);

module.exports = mongoose.model("Brand", brandSchema);
