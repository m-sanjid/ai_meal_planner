import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
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

  resetTokensIfNeeded(): Promise<void>;
  generateMeal(): Promise<{ success: boolean; message: string }>;
  upgradeToPro(
    subscriptionId: string
  ): Promise<{ success: boolean; message: string }>;
  downgradeToFree(): Promise<{ success: boolean; message: string }>;
  getSubscriptionStatus(): Promise<{
    tokens: number | "unlimited";
    subscription: "free" | "pro";
    subscriptionStatus: "active" | "inactive" | "canceled";
    nextReset: Date | null;
  }>;
}

const userSchema = new Schema<UserDocument>(
  {
    userId: { type: String, required: true, unique: true, index: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: { type: String, trim: true },
    tokens: { type: Number, default: 10, min: 0 },
    subscription: { type: String, enum: ["free", "pro"], default: "free" },
    subscriptionId: { type: String, default: null },
    subscriptionStatus: {
      type: String,
      enum: ["active", "inactive", "canceled"],
      default: "active",
    },
    nextReset: { type: Date, default: null },
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
          meal: { type: Schema.Types.Mixed, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

// Pre-save hook to initialize values
userSchema.pre<UserDocument>("save", function (next) {
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

// Method: Reset tokens if needed
userSchema.methods.resetTokensIfNeeded = async function () {
  if (this.subscription !== "free") return;

  const now = new Date();
  if (!this.nextReset || now >= this.nextReset) {
    this.tokens = 10;

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
    nextMonth.setHours(0, 0, 0, 0);
    this.nextReset = nextMonth;

    await this.save(); // Save updates
  }
};

// Method: Generate meal (deduct token)
userSchema.methods.generateMeal = async function () {
  await this.resetTokensIfNeeded();

  if (this.subscription === "free") {
    if (this.tokens <= 0) {
      throw new Error("Out of tokens. Upgrade to Pro.");
    }
    this.tokens -= 1;
  }

  await this.save();
  return { success: true, message: "Meal generated successfully" };
};

// Method: Upgrade to pro
userSchema.methods.upgradeToPro = async function (subscriptionId: string) {
  this.subscription = "pro";
  this.subscriptionId = subscriptionId;
  this.subscriptionStatus = "active";
  this.tokens = Infinity;
  this.nextReset = null;

  await this.save();
  return { success: true, message: "Upgraded to Pro successfully!" };
};

// Method: Downgrade to free
userSchema.methods.downgradeToFree = async function () {
  this.subscription = "free";
  this.subscriptionId = null;
  this.subscriptionStatus = "inactive";
  this.tokens = 10;

  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
  nextMonth.setHours(0, 0, 0, 0);
  this.nextReset = nextMonth;

  await this.save();
  return { success: true, message: "Downgraded to Free plan successfully!" };
};

// Method: Get subscription status
userSchema.methods.getSubscriptionStatus = async function () {
  await this.resetTokensIfNeeded(); // ensure tokens are up-to-date

  return {
    tokens: this.subscription === "pro" ? "unlimited" : this.tokens,
    subscription: this.subscription,
    subscriptionStatus: this.subscriptionStatus,
    nextReset: this.nextReset,
  };
};

export default mongoose.model<UserDocument>("User", userSchema);
