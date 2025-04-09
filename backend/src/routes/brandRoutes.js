// routes/brandRoutes.js
const express = require("express");
const { addBrand, getAllBrands } = require("../controllers/brandController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/brands/add-brand", authenticateUser, addBrand); // Add brand (auth required)
router.get("/brands/get-all-brands", authenticateUser, getAllBrands); // Get all brands (public)

module.exports = router;
