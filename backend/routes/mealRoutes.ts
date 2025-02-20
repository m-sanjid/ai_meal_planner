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
} from "../controllers";

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

export default router;
