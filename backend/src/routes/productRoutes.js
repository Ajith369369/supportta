const express = require("express");
const {
  getAllProductsAddedByAllUsers,
  getMyProducts,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAllProductsAddedByAllUsers); // All products with filters
router.get("/my-products", getMyProducts); // Only my products

module.exports = router;
