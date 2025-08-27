import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables first
dotenv.config();

import adminRoutes from "./routes/admin";
import userRoutes from "./routes/user";
import restaurantRoutes from "./routes/restaurant";
import riderRoutes from "./routes/rider";
import riderDashboardRoutes from "./routes/rider.dashboard";

console.log("🔥 server.ts is running...");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  console.log("🔥 /test route was called");
  res.send("✅ Express works");
});

// Routes
app.use("/admin", adminRoutes);
app.use("/api/auth", userRoutes);
app.use("/restaurant", restaurantRoutes);

// Rider routes
app.use("/rider", riderRoutes);
app.use("/rider/dashboard", riderDashboardRoutes); // better to separate dashboard under /rider/dashboard

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
