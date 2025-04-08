const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./database/connection");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const brandRoutes = require("./routes/brandRoutes");
const productRoutes = require("./routes/productRoutes");

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

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", brandRoutes);
app.use("/api", productRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
