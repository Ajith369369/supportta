// Token Refresh API
const refreshAccessToken = async (req, res) => {
  const { refreshToken } = req.body;

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

        res.status(200).json({
          accessToken,
          refreshToken: newRefreshToken,
        });
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", details: error.message });
  }
};

exports.refreshAccessToken = refreshAccessToken;
