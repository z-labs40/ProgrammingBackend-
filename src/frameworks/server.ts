import "reflect-metadata";
import express from "express";
import cors from "cors";
import { connectDB } from "../infrastructure/database";
import apiRoutes from "./routes";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize Database
connectDB();

// API Routes
app.use("/api", apiRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is running" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
