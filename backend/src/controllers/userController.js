const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateTokens = require("../utils/generateTokens");

// Register user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePhoto } = req.body;

    // Check if user already exists
    // The return statement inside the if (existingUser) block prevents the execution of the rest of the try block if the user already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profilePhoto,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Generate tokens
    const { accessToken, refreshToken } = generateTokens(user);

    // Set refreshToken as HTTP-only cookie
    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // set true in prod
        sameSite: "Strict", // or "Lax" depending on frontend
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(200)
      .json({
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          accessToken,
        },
      });
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
      details: error.message,
    });
  }
};

// Update profile
const updateUserProfile = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: req.body.username,
        email: req.body.email,
        profilePhoto: req.body.profilePhoto,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Profile updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete profile
const deleteUserProfile = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const blockUser = async (req, res) => {
  try {
    const userToBlock = req.params.userId;
    const currentUser = await User.findById(req.user.id);

    if (!currentUser.blockedUsers.includes(userToBlock)) {
      currentUser.blockedUsers.push(userToBlock);
      await currentUser.save();
    }

    res.status(200).json({ message: "User blocked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const unblockUser = async (req, res) => {
  try {
    const userToUnblock = req.params.userId;
    const currentUser = await User.findById(req.user.id);

    currentUser.blockedUsers = currentUser.blockedUsers.filter(
      (id) => id.toString() !== userToUnblock
    );
    await currentUser.save();

    res.status(200).json({ message: "User unblocked successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  blockUser,
  unblockUser,
};
