import express from "express";
import { generateMealPlan, getMealPlans } from "../controllers";

const router = express.Router();
router.post("/generate", generateMealPlan);
router.get("/", getMealPlans);

export default router;
