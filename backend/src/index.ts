import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mealRoutes from "./routes/mealRoutes";
import userRoutes from "./routes/userRoutes";
import subscribeRoutes from "./routes/subscribeRoutes";
import shoppingListRoutes from "./routes/shoppingListRoutes";
import calorieRoutes from "./routes/calorieRoutes";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import contactRoutes from "./routes/contact";

const app = express();

// 1. CORS 
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'https://ai-meal-planner-m-sanjids-projects.vercel.app', 
    'https://befitai.sanjid.shop', 
    'http://127.0.0.1:5173',
    'https://ai-meal-planner-4i4t.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// 2. Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 3. Connect to DB
connectDB();

// 4. Clerk middleware comes *after* CORS
app.use(clerkMiddleware());

// 5. Routes
app.use("/api/meals", mealRoutes);
app.use("/api/users", userRoutes);
app.use("/api/shopping-list", shoppingListRoutes);
app.use("/api/sub", subscribeRoutes);
app.use("/api/calorie", calorieRoutes);
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(3000, () => console.log("Server started on port 3000"));
