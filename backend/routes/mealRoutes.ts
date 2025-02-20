import express from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
  generateMealPlan,
  getMealPlans,
  getUserMealPlans,
  updateMealPortion,
} from "../controllers";

const router = express.Router();

router.post("/generate", requireAuth, generateMealPlan); // ✅ Protect route
router.get("/", requireAuth, getMealPlans); // ✅ Protect route
router.get("/user", requireAuth, getUserMealPlans); // ✅ Protect route
router.put(
  "/update-portion/:mealPlanId/:mealIndex",
  requireAuth,
  updateMealPortion,
); // ✅ Protect route

export default router;
