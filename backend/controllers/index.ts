import { type Request, type Response } from "express";
import MealPlan from "../models/MealPlan";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY!;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateMealPlan = async (req: Request, res: Response) => {
  try {
    //Debugging log
    console.log("Received Request Body:", req.body);

    const { goal, dietaryPreferences, userId } = req.body;

    if (!goal || !dietaryPreferences || !userId) {
      throw new Error(
        "Missing required fields: goal, dietaryPreferences, or userId.",
      );
    }

    // Construct the prompt
    const prompt = `Create a meal plan for ${goal} with ${dietaryPreferences}. 
    Include meal name, calories, macros (protein, carbs, fats), and ingredients.
    Return the response in valid JSON format, without markdown or extra text.
    Example:
    {
      "meals": [
        {
          "name": "Grilled Chicken Salad",
          "calories": 400,
          "macros": { "protein": 40, "carbs": 30, "fat": 10 },
          "ingredients": ["Chicken Breast", "Lettuce", "Tomatoes", "Olive Oil"]
        }
      ]
    }`;

    // Generate content using Gemini AI
    const result = await model.generateContent(prompt);
    let responseText = result.response.text();
    //Log the raw response
    console.log("AI Response Before Processing:", responseText);

    if (!responseText) {
      throw new Error("AI failed to generate a response.");
    }

    responseText = responseText.replace(/```json|```/g, "").trim();
    //Log the cleaned response
    console.log("Cleaned AI Response:", responseText);

    // Parse AI response
    let aiGeneratedPlan;
    try {
      aiGeneratedPlan = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseText);
      throw new Error("AI returned invalid JSON.");
    }

    let totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    aiGeneratedPlan.meals.forEach((meal: any) => {
      totalNutrition.calories += Number(meal.calories) || 0;
      totalNutrition.protein += Number(meal.macros?.protein) || 0;
      totalNutrition.carbs += Number(meal.macros?.carbs) || 0;
      totalNutrition.fat += Number(meal.macros?.fat) || 0;
    });

    // Save to MongoDB
    const newMealPlan = new MealPlan({
      userId,
      goal,
      meals: aiGeneratedPlan.meals,
      totalNutrition,
    });
    await newMealPlan.save();

    res.status(200).json(newMealPlan);
  } catch (error: any) {
    console.error("Error generating meal plan:", error);
    res
      .status(500)
      .json({ error: error.message || "Failed to generate meal plan" });
  }
};

export const getMealPlans = async (req: Request, res: Response) => {
  try {
    const mealPlans = await MealPlan.find();
    res.status(200).json(mealPlans);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meal plans" });
  }
};

export const updateMealPortion = async (req: Request, res: Response) => {
  try {
    const { mealPlanId, mealIndex } = req.params;
    const { portionSize } = req.body;

    if (!portionSize || portionSize <= 0) {
      return res.status(400).json({ error: "Invalid portion size" });
    }

    const mealPlan = await MealPlan.findById(mealPlanId);
    if (!mealPlan) {
      return res.status(404).json({ error: "Meal plan not found" });
    }

    const meal = mealPlan.meals[mealIndex];
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }

    const scaleFactor = portionSize / meal.portionSize;
    meal.calories *= scaleFactor;
    meal.macros.protein *= scaleFactor;
    meal.macros.carbs *= scaleFactor;
    meal.macros.fat *= scaleFactor;
    meal.portionSize = portionSize;

    mealPlan.totalNutrition = mealPlan.meals.reduce(
      (total, meal) => {
        total.calories += meal.calories || 0;
        total.protein += meal.macros?.protein || 0;
        total.carbs += meal.macros?.carbs || 0;
        total.fat += meal.macros?.fat || 0;
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 },
    );

    await mealPlan.save();
    res.status(200).json(mealPlan);
  } catch (error) {
    console.error("Error updating meal portion:", error);
    res.status(500).json({ error: "Failed to update meal portion" });
  }
};

export const getUserMealPlans = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
    }

    const fetchedMealPlans = await MealPlan.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(fetchedMealPlans);
  } catch (error) {
    console.error("Error fetching user meal plans:", error);
    res.status(500).json({ error: "Failed to retrieve meal plans." });
  }
};
