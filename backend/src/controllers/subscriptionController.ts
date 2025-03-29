import razorpay from "../config/razorpay";
import type { AuthenticatedRequest } from "../middlewares/authMiddleware";
import User from "../models/user";
import type { Request, Response } from "express";
import crypto from "crypto";

const validPlans = ["plan_Q1Ssb9efvNYZlP", "plan_Q1Srxoloblnvpy"];

export const createSubscription = async (
	req: AuthenticatedRequest,
	res: Response,
) => {
	const userId = req.user?.userId;
	if (!userId) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	const { planId } = req.body;
	if (!planId) {
		res.status(400).json({ message: "Plan ID is required" });
		return;
	}

	if (!validPlans.includes(planId)) {
		res.status(400).json({ message: "Invalid plan ID" });
		return;
	}

	try {
		const user = await User.findOne({ userId });
		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const subscription = await razorpay.subscriptions.create({
			plan_id: planId,
			customer_notify: 1,
			total_count: 12, // 12 months
		});

		await user.upgradeToPro(subscription.id);

		res.json({
			subscriptionId: subscription.id,
			message: "Subscription created!",
		});
		return;
	} catch (error) {
		console.error(
			"Subscription creation error:",
			JSON.stringify(error, null, 2),
		);
		res.status(500).json({
			message: "Failed to create subscription",
			error: error,
		});
		return;
	}
};

export const subscriptionStatus = async (
	req: AuthenticatedRequest,
	res: Response,
) => {
	const userId = req.user?.userId;
	console.log("Received User ID:", userId);

	if (!userId) {
		res.status(401).json({ message: "Unauthorized" });
		return;
	}

	try {
		const user = await User.findOne({ userId });

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const statusInfo = user.getSubscriptionStatus();

		res.json({
			tokens: statusInfo.tokens,
			subscription: statusInfo.subscription,
			subscriptionStatus: statusInfo.subscriptionStatus,
			nextReset: statusInfo.nextReset,
		});
	} catch (error) {
		console.error("Failed to fetch user status:", error);
		res.status(500).json({ message: "Failed to fetch user status", error });
	}
};

export const subscriptionWebhook = async (req: Request, res: Response) => {
	const signature = req.headers["x-razorpay-signature"];
	const body = JSON.stringify(req.body);

	if (!signature) {
		res.status(400).json({ message: "Missing signature header" });
		return;
	}

	const expectedSignature = crypto
		.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
		.update(body)
		.digest("hex");

	if (signature !== expectedSignature) {
		res.status(400).json({ message: "Invalid webhook signature" });
		return;
	}

	const event = req.body.event;

	try {
		if (event === "subscription.cancelled") {
			const subscriptionId = req.body.payload.subscription.entity.id;
			const user = await User.findOne({ subscriptionId });
			if (user) {
				await user.downgradeToFree();
			}
		}

		if (event === "subscription.charged") {
			const subscriptionId = req.body.payload.subscription.entity.id;
			await User.findOneAndUpdate(
				{ subscriptionId },
				{ subscriptionStatus: "active" },
			);
		}

		if (event === "subscription.updated") {
			const subscriptionId = req.body.payload.subscription.entity.id;
			await User.findOneAndUpdate(
				{ subscriptionId },
				{ subscriptionStatus: "active" },
			);
		}

		res.status(200).json({ message: "Webhook processed successfully" });
	} catch (error: any) {
		console.error("Webhook handling error:", error.message);
		res.status(500).json({
			message: "Internal Server Error: Failed to process webhook",
			error: error.message,
		});
	}
};

export const cancelSubscription = async ( req:AuthenticatedRequest,res:Response) =>{
	const userId = req.user?.userId
	
	if(!userId) {
		res.status(401).json({message:"Unauthorized"})
		return
	}

	try {
    const user = await User.findOne({ userId });
    if (!user || !user.subscriptionId) {
      res.status(404).json({ message: "Active subscription not found" });
      return;
    }

    await razorpay.subscriptions.cancel(user.subscriptionId);
    await user.downgradeToFree();

    res.json({ message: "Subscription cancelled and downgraded to free plan" });
  } catch (error:any) {
    console.error("Subscription cancellation error:", error);
    res.status(500).json({
      message: "Failed to cancel subscription",
      error: error.message,
    });
  }}
