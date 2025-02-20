import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mealRoutes from "./routes/mealRoutes.ts";
import userRoutes from "./routes/userRoutes";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";

const app = express();
app.use(cors());
connectDB();
app.use(clerkMiddleware());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.listen(3000, () => console.log("Server started on port 3000"));
