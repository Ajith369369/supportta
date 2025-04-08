const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// ✅ POST: Register a new user
const registerUser = async (req, res) => {
  try {
    const { username, email, password, profilePhoto } = req.body;

    // ✅ Check if user already exists
    // The return statement inside the if (existingUser) block prevents the execution of the rest of the try block if the user already exists.
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // ✅ Create user
    const newUser = new User({
      username,
      email,
      password,
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

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Check if user exists
    const user = await User.findOne({ email, password });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // ✅ Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "2d", // Token expires in 7 days
    });

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

module.exports = { registerUser, loginUser };
