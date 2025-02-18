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

    // Save to MongoDB
    const newMealPlan = new MealPlan({
      userId,
      goal,
      meals: aiGeneratedPlan.meals,
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
