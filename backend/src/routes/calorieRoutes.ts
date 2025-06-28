import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  getCalorieEntries,
  addMeal,
  deleteMeal,
  updateDailyGoal,
  getNutritionSummary,
} from "../controllers/calorieController";

const router = express.Router();

// Get calorie entries for a user (optionally filtered by date)
router.get("/entries", requireAuth, getCalorieEntries);

// Add a new meal to calorie tracking
router.post("/meals", requireAuth, addMeal);

// Delete a meal from calorie tracking
router.delete("/entries/:entryId/meals/:mealId", requireAuth, deleteMeal);

// Update daily calorie goal
router.put("/daily-goal", requireAuth, updateDailyGoal);

// Get nutrition summary for a date range
router.get("/summary", requireAuth, getNutritionSummary);

export default router; 