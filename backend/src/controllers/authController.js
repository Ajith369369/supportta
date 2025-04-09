// Token Refresh API
const generateTokens = require("../utils/generateTokens");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token required" });
  }

  try {
    jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err)
          return res
            .status(403)
            .json({ error: "Invalid or expired refresh token" });

        const user = await User.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found" });

        const { accessToken, refreshToken: newRefreshToken } =
          generateTokens(user);

        // Set new refresh token in secure HTTP-only cookie
        res.cookie("refreshToken", newRefreshToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production", // true in production (HTTPS)
          sameSite: "strict",
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
          accessToken,
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
};
