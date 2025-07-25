import express from "express";
import cors from "cors";
import connectDB from "./config/db";
import mealRoutes from "./routes/mealRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import subscribeRoutes from "./routes/subscribeRoutes.js";
import shoppingListRoutes from "./routes/shoppingListRoutes.js";
import calorieRoutes from "./routes/calorieRoutes.js";
import { clerkMiddleware } from "@clerk/express";
import "dotenv/config";
import contactRoutes from "./routes/contact.js";

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

// Debug middleware to log all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

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

// Test subscription endpoint without auth
app.get("/api/sub/test", (req, res) => {
  res.json({ message: "Subscription route is working" });
});

app.listen(3000, () => console.log("Server started on port 3000"));
