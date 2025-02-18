import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  goal: { type: String, required: true },
  meals: [
    {
      name: String,
      calories: Number,
      macros: {
        protein: Number,
        carbs: Number,
        fat: Number,
      },
      ingredients: [String],
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("MealPlan", mealPlanSchema);
