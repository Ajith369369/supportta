// routes/brandRoutes.js
const express = require("express");
const { addBrand, getAllBrands } = require("../controllers/brandController");

const router = express.Router();

router.post("/brands/add-brand", addBrand); // Add brand (auth required)
router.get("/brands/get-all-brands", getAllBrands);           // Get all brands (public)

module.exports = router;
