import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mealRoutes from "./routes/mealRoutes";
import userRoutes from "./routes/userRoutes";
import subscribeRoutes from "./routes/subscribeRoutes";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,              
  }));
app.use(express.json());
connectDB();
app.use(clerkMiddleware());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sub", subscribeRoutes);
app.listen(3000, () => console.log("Server started on port 3000"));
