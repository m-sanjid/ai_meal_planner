import mongoose from "mongoose";

const calorieEntrySchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  date: { type: Date, required: true, default: Date.now },
  meals: [
    {
      id: String,
      name: { type: String, required: true },
      calories: { type: Number, required: true },
      protein: { type: Number, default: 0 },
      carbs: { type: Number, default: 0 },
      fat: { type: Number, default: 0 },
      time: { type: String, required: true },
    },
  ],
  dailyGoal: { type: Number, default: 2000 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Index for efficient queries by userId and date
calorieEntrySchema.index({ userId: 1, date: 1 });

// Update the updatedAt field on save
calorieEntrySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model("CalorieEntry", calorieEntrySchema);
