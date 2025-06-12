import mongoose, { Document } from "mongoose";

interface UserDocument extends Document {
	userId: string;
	email: string;
	name?: string;
	tokens: number;
	subscription: "free" | "pro";
	subscriptionId?: string | null;
	subscriptionStatus: "active" | "inactive" | "canceled";
	nextReset?: Date | null;
	createdAt: Date;
	updatedAt: Date;
	nutritionGoals: {
		calories: number;
		protein: number;
		carbs: number;
		fat: number;
	};
	preferences: string[];
	scheduledMeals: {
		date: Date;
		mealType: "breakfast" | "lunch" | "dinner" | "snack";
		meal: any;
	}[];

	resetTokensIfNeeded(): void;
	generateMeal(): Promise<{ success: boolean; message: string }>;
	upgradeToPro(
		subscriptionId: string,
	): Promise<{ success: boolean; message: string }>;
	downgradeToFree(): Promise<{ success: boolean; message: string }>;
	getSubscriptionStatus(): {
		tokens: number | "unlimited";
		subscription: "free" | "pro";
		subscriptionStatus: "active" | "inactive" | "canceled";
		nextReset: Date | null;
	};
}

const userSchema = new mongoose.Schema<UserDocument>(
	{
		userId: { type: String, required: true, unique: true, index: true },
		email: { type: String, required: true, unique: true, lowercase: true, trim: true},
		name: { type: String, trim: true },
		tokens: { type: Number, default: 10, min: 0 },
		subscription: { type: String, enum: ["free", "pro"], default: "free" },
		subscriptionId: { type: String, default: null },
		subscriptionStatus: {type: String,enum: ["active", "inactive", "canceled"],default: "inactive"},
		nextReset: { type: Date, default: null, required: false },
		nutritionGoals: {
			calories: { type: Number, default: 2000 },
			protein: { type: Number, default: 150 },
			carbs: { type: Number, default: 200 },
			fat: { type: Number, default: 65 },
		},
		preferences: { type: [String], default: [] },
		scheduledMeals: {
			type: [
				{
					date: { type: Date, required: true },
					mealType: {
						type: String,
						enum: ["breakfast", "lunch", "dinner", "snack"],
						required: true,
					},
					meal: { type: mongoose.Schema.Types.Mixed, required: true },
				},
			],
			default: [],
		},
	},
	{ timestamps: true },
);

// Auto-set status & tokens based on subscription type
userSchema.pre("save", function (next) {
  if (this.subscription === "free") {
    this.subscriptionStatus = "inactive";
    if (!this.nextReset) {
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
      nextMonth.setHours(0, 0, 0, 0);
      this.nextReset = nextMonth;
    }
  } else if (this.subscription === "pro") {
    this.tokens = Infinity;
    this.nextReset = null;
    this.subscriptionStatus = "active";
  }
  next();
});

// Token reset logic for free users
userSchema.methods.resetTokensIfNeeded = function () {
  if (this.subscription === "free") {
    const now = new Date();
    if (!this.nextReset || now >= this.nextReset) {
      this.tokens = 10; 
      const nextMonth = new Date();
      nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
      nextMonth.setHours(0, 0, 0, 0);
      this.nextReset = nextMonth;
    }
  }
};

//token deduction on generateMeal
userSchema.methods.generateMeal = async function () {
  this.resetTokensIfNeeded();
  if (this.subscription === "free") {
    if (this.tokens <= 0) {
      throw new Error("Out of tokens, upgrade to pro");
    }
    this.tokens -= 1;
  }
  await this.save(); 
  return { success: true, message: "Meal generated successfully" }; // Fixed: "true" → true
};

// Upgrade to pro subscription
userSchema.methods.upgradeToPro = async function (subscriptionId: string) {
	this.subscription = "pro";
	this.subscriptionId = subscriptionId;
	this.subscriptionStatus = "active";
	this.tokens = Infinity;
	this.nextReset = null;

	await this.save();
	return { success: true, message: "Upgraded to Pro successfully!" };
};

// Downgrade to free plan
userSchema.methods.downgradeToFree = async function () {
	this.subscription = "free";
	this.subscriptionId = null;
	this.subscriptionStatus = "inactive";
	this.tokens = 10;

	// Set next reset to 1st of next month
	const nextMonth = new Date();
	nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
	nextMonth.setHours(0, 0, 0, 0);
	this.nextReset = nextMonth;

	await this.save();
	return { success: true, message: "Downgraded to Free plan successfully!" };
};

// Get subscription & token status
userSchema.methods.getSubscriptionStatus = function () {
	this.resetTokensIfNeeded();

	return {
		tokens: this.subscription === "pro" ? "unlimited" : this.tokens,
		subscription: this.subscription,
		subscriptionStatus: this.subscriptionStatus,
		nextReset: this.nextReset,
	};
};

export default mongoose.model("User", userSchema);
