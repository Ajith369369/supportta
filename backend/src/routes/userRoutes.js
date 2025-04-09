const express = require("express");
const {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
} = require("../controllers/userController");

const router = express.Router();

router.post("/users/register", registerUser);
router.post("/users/login", loginUser); // Delete user by ID
router.put("/users/:id", updateUserProfile);
router.delete("/users/:id", deleteUserProfile);

module.exports = router;
