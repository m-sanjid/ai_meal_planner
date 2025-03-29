import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
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
      portionSize: { type: Number, default: 1 },
    },
  ],
  totalNutrition: {
    calories: Number,
    protein: Number,
    carbs: Number,
    fat: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("MealPlan", mealPlanSchema);
