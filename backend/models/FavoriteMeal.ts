import mongoose from "mongoose";

const favoriteMealSchema = new mongoose.Schema({
  userId: { type: String, ref: "User", required: true },
  meal: {
    name: String,
    calories: Number,
    macros: {
      protien: Number,
      carbs: Number,
      fat: Number,
    },
    ingredients: [String],
  },
});

export default mongoose.model("FavoriteMeal", favoriteMealSchema);
