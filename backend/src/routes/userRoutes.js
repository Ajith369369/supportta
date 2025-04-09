const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");
const { refreshAccessToken } = require("../controllers/authController");

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser); // Delete user by ID
router.put("/users/:id", refreshAccessToken, updateUserProfile);
router.delete("/users/:id", refreshAccessToken, deleteUserProfile);

module.exports = router;
