import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  generateMealPlan,
  getFavoriteMeal,
  getMealPlans,
  getUserMealPlans,
  removeFavoriteMeal,
  saveFavoriteMeal,
  updateMealPortion,
  generateMeal,
  addMealToCalendar,
  getMealsForWeek,
} from "../controllers/mealController";

const router = express.Router();

router.post("/generate", requireAuth, generateMealPlan);
router.get("/", requireAuth, getMealPlans);
router.get("/user", requireAuth, getUserMealPlans);
router.put(
  "/update-portion/:mealPlanId/:mealIndex",
  requireAuth,
  updateMealPortion,
);
router.post("/favorites", requireAuth, saveFavoriteMeal);
router.get("/favorites/:userId", requireAuth, getFavoriteMeal);
router.delete("/favorites/:favoriteId", requireAuth, removeFavoriteMeal);

// Protected routes
router.post('/generate', requireAuth, generateMeal);
router.post('/calendar', requireAuth, addMealToCalendar);
router.get('/calendar/week', requireAuth, getMealsForWeek);

export default router;
