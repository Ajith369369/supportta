// routes/brandRoutes.js
const express = require("express");
const { addBrand, getAllBrands } = require("../controllers/brandController");

const router = express.Router();

router.post("/brands", addBrand); // Add brand (auth required)
router.get("/brands", getAllBrands);           // Get all brands (public)

module.exports = router;
