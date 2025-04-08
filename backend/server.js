const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./app/database/connection");
const userRoutes = require("./app/routes/userRoutes");
const userProfileRoutes = require("./app/routes/userProfileRoutes");

dotenv.config();

// Create server
const app = express();
const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Routes
 *
 * Base API route
 * app.use("/api", userProfileRoutes);
 */
app.use(userRoutes);
app.use(userProfileRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
