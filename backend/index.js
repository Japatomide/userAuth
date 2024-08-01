import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import { connectDB } from "./config/databaseConnect.js";
import authRoutes from "../backend/routes/authRoutes.js";

const app = express();
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use(morgan('dev'))

app.get("/api-health", (req, res) => {
  res.status(200).json({ message: "Api is healthy" });
});

const port = process.env.PORT || 3001;

app.listen(port, async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log("Error", error);
  }
});
