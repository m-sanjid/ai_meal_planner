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
    origin: process.env.APP_URL,
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

export default app
