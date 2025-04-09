const express = require("express");
const {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProductsAddedByAllUsers,
  getMyProducts,
} = require("../controllers/productController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/products/add-product", authenticateUser, addProduct);
router.put("/products/:id", authenticateUser, updateProduct);
router.delete("/products/:id", authenticateUser, deleteProduct);
router.get(
  "/products/get-all-products",
  authenticateUser,
  getAllProductsAddedByAllUsers
); // All products with filters
router.get("/products/get-my-products", authenticateUser, getMyProducts); // Only my products

module.exports = router;
