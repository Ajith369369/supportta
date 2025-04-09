const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");
const authenticateUser = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser); // Delete user by ID
router.put("/users/:id", authenticateUser, updateUserProfile);
router.delete("/users/:id", authenticateUser, deleteUserProfile);

module.exports = router;
