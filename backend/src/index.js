const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Load environment variables
dotenv.config();

const connectDB = require("./config/database");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const entryRoutes = require("./routes/entryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { getAllEntries } = require("./controllers/allEntry");

const app = express();

// ✅ Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/entries", entryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.get("/api/all-entries", getAllEntries);

// ✅ Start Server
const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    console.log("✅ Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}!`);
    });
  })
  .catch((error) => {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    process.exit(1); // Exit the process on DB error
  });
