import express from "express";
import {
  cancelSubscription,
	createSubscription,
	subscriptionStatus,
	subscriptionWebhook,
} from "../controllers/subscriptionController";
import { requireAuth } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/subscription-status", requireAuth, subscriptionStatus);
router.post("/razorpay-webhook", requireAuth, subscriptionWebhook);
router.post("/create-subscription", requireAuth, createSubscription);
router.post("/cancel-subscription",requireAuth,cancelSubscription)

export default router;
