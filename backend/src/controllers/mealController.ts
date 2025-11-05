import { type Request, type Response } from "express";
import MealPlan from "../models/MealPlan";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FavoriteMeal from "../models/FavoriteMeal";
import type { AuthenticatedRequest } from "../middlewares/authMiddleware";
import User from "../models/user";
import { DayMeals, Meal } from "../models/Meal";

const apiKey = process.env.GEMINI_API_KEY!;
if (!apiKey) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

let userMeals: Record<string, DayMeals[]> = {};

export const generateMealPlan = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { goal, dietaryPreferences } = req.body;

    const userId = req.user?.userId || req.body.userId;
    if (!goal || !dietaryPreferences) {
      throw new Error("Missing required fields: goal or dietaryPreferences.");
    }

    // DEMO: If no userId, allow up to 2 demo generations (frontend tracks this)
    if (!userId) {
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

      if (!responseText) {
        throw new Error("AI failed to generate a response.");
      }

      responseText = responseText.replace(/```json|```/g, "").trim();

      // Parse AI response
      let aiGeneratedPlan;
      try {
        aiGeneratedPlan = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse AI response:", responseText, parseError);
        throw new Error("AI returned invalid JSON.");
      }

      const totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
      aiGeneratedPlan.meals.forEach((meal: any) => {
        totalNutrition.calories += Number(meal.calories) || 0;
        totalNutrition.protein += Number(meal.macros?.protein) || 0;
        totalNutrition.carbs += Number(meal.macros?.carbs) || 0;
        totalNutrition.fat += Number(meal.macros?.fat) || 0;
      });

      // Do NOT save to DB for demo
      res.status(200).json({
        meals: aiGeneratedPlan.meals,
        totalNutrition,
        demo: true,
      });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    try {
      await user.generateMeal();
    } catch (tokenError: any) {
      res.status(403).json({ error: tokenError.message });
      return;
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

    if (!responseText) {
      throw new Error("AI failed to generate a response.");
    }

    responseText = responseText.replace(/```json|```/g, "").trim();

    // Parse AI response
    let aiGeneratedPlan;
    try {
      aiGeneratedPlan = JSON.parse(responseText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", responseText, parseError);
      throw new Error("AI returned invalid JSON.");
    }

    const totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
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
    console.error("Error fetching meal plans:", error);
  }
};

export const updateMealPortion = async (req: Request, res: Response) => {
  try {
    const { mealPlanId, mealIndex } = req.params;
    const { portionSize } = req.body;

    if (!portionSize || portionSize <= 0) {
      res.status(400).json({ error: "Invalid portion size" });
      return;
    }

    const mealPlan = await MealPlan.findById(mealPlanId);
    if (!mealPlan) {
      res.status(404).json({ error: "Meal plan not found" });
      return;
    }

    const mealIndexNumber = parseInt(mealIndex, 10);
    const meal = mealPlan.meals[mealIndexNumber];
    if (!meal) {
      res.status(404).json({ error: "Meal not found" });
      return;
    }

    const scaleFactor = portionSize / meal.portionSize;
    meal.calories = meal.calories ? meal.calories * scaleFactor : 0;
    meal.macros = meal.macros
      ? {
        protein: meal.macros.protein ? meal.macros.protein * scaleFactor : 0,
        carbs: meal.macros.carbs ? meal.macros.carbs * scaleFactor : 0,
        fat: meal.macros.fat ? meal.macros.fat * scaleFactor : 0,
      }
      : { protein: 0, carbs: 0, fat: 0 };
    meal.portionSize = portionSize;

    mealPlan.totalNutrition = mealPlan.meals.reduce(
      (total, meal) => {
        total.calories += meal.calories || 0;
        total.protein += meal.macros?.protein || 0;
        total.carbs += meal.macros?.carbs || 0;
        total.fat += meal.macros?.fat || 0;
        return total;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );

    await mealPlan.save();
    res.status(200).json(mealPlan);
  } catch (error) {
    console.error("Error updating meal portion:", error);
    res.status(500).json({ error: "Failed to update meal portion" });
  }
};

export const getUserMealPlans = async (
  req: AuthenticatedRequest,
  res: Response
) => {
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

export const saveFavoriteMeal = async (req: Request, res: Response) => {
  try {
    const { userId, meal } = req.body;
    if (!userId || !meal) {
      res.status(400).json({ error: "Missing userId or meal data" });
      return;
    }

    const favorite = new FavoriteMeal({ userId, meal });
    await favorite.save();

    res.status(200).json({ message: "Meal added to favorite", favorite });
  } catch (error) {
    console.error("Error while adding favorite", error);
    res.status(500).json({ error: "Failed to save favorite meal" });
  }
};

export const getFavoriteMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const favorites = await FavoriteMeal.find({ userId });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorite", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};

export const removeFavoriteMeal = async (req: Request, res: Response) => {
  try {
    const { favoriteId } = req.params;

    const deletedFavorite = await FavoriteMeal.findByIdAndDelete(favoriteId);

    if (!deletedFavorite) {
      res.status(404).json({ error: "Favorite meal not found" });
      return;
    }

    res.status(200).json({ message: "Favorite meal removed successfully" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Failed to remove favorite meal" });
  }
};

export const generateMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { goal, dietaryPreferences } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const mealPlan = await MealPlan.findOne({ userId });
    if (!mealPlan) {
      res.status(404).json({ error: "Meal plan not found" });
      return;
    }

    // Calculate current nutrition totals
    const totalNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    mealPlan.meals.forEach((meal: any) => {
      totalNutrition.calories += Number(meal.calories) || 0;
      totalNutrition.protein += Number(meal.macros?.protein) || 0;
      totalNutrition.carbs += Number(meal.macros?.carbs) || 0;
      totalNutrition.fat += Number(meal.macros?.fat) || 0;
    });

    // Calculate remaining nutrition needs based on user's goals
    const dailyTargets = user.nutritionGoals || {
      calories: 2000,
      protein: 150,
      carbs: 200,
      fat: 65,
    };
    const remainingNutrition = {
      calories: Math.max(0, dailyTargets.calories - totalNutrition.calories),
      protein: Math.max(0, dailyTargets.protein - totalNutrition.protein),
      carbs: Math.max(0, dailyTargets.carbs - totalNutrition.carbs),
      fat: Math.max(0, dailyTargets.fat - totalNutrition.fat),
    };

    // Generate meal based on goal, dietary preferences, and remaining nutrition
    const generatedMeal = await generateMealBasedOnCriteria({
      goal,
      dietaryPreferences,
      remainingNutrition,
      userPreferences: user.preferences,
    });

    // Add the generated meal to the meal plan
    mealPlan.meals.push(generatedMeal);
    await mealPlan.save();

    res.json({
      meal: generatedMeal,
      remainingNutrition,
      totalNutrition: {
        calories: totalNutrition.calories + generatedMeal.calories,
        protein: totalNutrition.protein + generatedMeal.macros.protein,
        carbs: totalNutrition.carbs + generatedMeal.macros.carbs,
        fat: totalNutrition.fat + generatedMeal.macros.fat,
      },
    });
  } catch (error) {
    console.error("Error generating meal:", error);
    res.status(500).json({ error: "Failed to generate meal" });
  }
};

// Helper function to generate meal based on criteria
const generateMealBasedOnCriteria = async (criteria: {
  goal: string;
  dietaryPreferences: string[];
  remainingNutrition: any;
  userPreferences: any;
}): Promise<Meal> => {
  const { goal, dietaryPreferences, remainingNutrition, userPreferences } =
    criteria;

  // Meal database or API call would go here
  // For now, return a contextual meal based on the goal
  const mealTemplates = {
    weight_loss: {
      name: "Grilled Chicken Salad",
      baseCalories: 350,
      macros: { protein: 35, carbs: 15, fat: 12 },
      ingredients: [
        "Grilled chicken breast",
        "Mixed greens",
        "Cherry tomatoes",
        "Cucumber",
        "Olive oil vinaigrette",
      ],
    },
    muscle_gain: {
      name: "Protein Power Bowl",
      baseCalories: 650,
      macros: { protein: 45, carbs: 55, fat: 18 },
      ingredients: [
        "Lean ground turkey",
        "Quinoa",
        "Sweet potato",
        "Black beans",
        "Avocado",
      ],
    },
    maintenance: {
      name: "Balanced Mediterranean Plate",
      baseCalories: 500,
      macros: { protein: 30, carbs: 40, fat: 20 },
      ingredients: [
        "Baked salmon",
        "Brown rice",
        "Roasted vegetables",
        "Hummus",
        "Mixed nuts",
      ],
    },
  };

  let selectedTemplate =
    mealTemplates[goal as keyof typeof mealTemplates] ||
    mealTemplates.maintenance;

  // Adjust for dietary preferences
  if (dietaryPreferences?.includes("vegetarian")) {
    selectedTemplate = {
      name: "Vegetarian Protein Bowl",
      baseCalories: 480,
      macros: { protein: 25, carbs: 45, fat: 18 },
      ingredients: [
        "Tofu",
        "Quinoa",
        "Chickpeas",
        "Spinach",
        "Tahini dressing",
      ],
    };
  } else if (dietaryPreferences?.includes("vegan")) {
    selectedTemplate = {
      name: "Vegan Power Plate",
      baseCalories: 520,
      macros: { protein: 22, carbs: 50, fat: 20 },
      ingredients: [
        "Lentils",
        "Brown rice",
        "Roasted vegetables",
        "Nutritional yeast",
        "Cashew cream",
      ],
    };
  }

  // Scale based on remaining nutrition needs
  const scaleFactor = Math.min(
    remainingNutrition.calories > 0
      ? remainingNutrition.calories / selectedTemplate.baseCalories
      : 1,
    2 // Cap at 2x to avoid oversized meals
  );

  return {
    name: selectedTemplate.name,
    calories: Math.round(selectedTemplate.baseCalories * scaleFactor),
    macros: {
      protein: Math.round(selectedTemplate.macros.protein * scaleFactor),
      carbs: Math.round(selectedTemplate.macros.carbs * scaleFactor),
      fat: Math.round(selectedTemplate.macros.fat * scaleFactor),
    },
    ingredients: selectedTemplate.ingredients,
  };
};

export const addMealToCalendar = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { date, mealType, meal } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!date || !mealType || !meal) {
      res
        .status(400)
        .json({ error: "Missing required fields: date, mealType, meal" });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const targetDate = new Date(date);

    const existingMealIndex = user.scheduledMeals.findIndex(
      (sm) =>
        sm.date.toDateString() === targetDate.toDateString() &&
        sm.mealType === mealType
    );

    if (existingMealIndex >= 0) {
      // Update existing meal
      user.scheduledMeals[existingMealIndex].meal = meal;
    } else {
      // Add new meal
      user.scheduledMeals.push({ date: targetDate, mealType, meal });
    }

    await user.save();

    res.status(200).json({
      message: "Meal added to calendar successfully",
      scheduledMeals: user.scheduledMeals,
    });
  } catch (error) {
    console.error("Error adding meal to calendar:", error);
    res.status(500).json({ error: "Failed to add meal to calendar" });
  }
};

export const getCalendarMeals = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(user.scheduledMeals);
  } catch (error) {
    console.error("Error fetching calendar meals:", error);
    res.status(500).json({ error: "Failed to fetch calendar meals" });
  }
};

export const updateCalendarMeal = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { mealId } = req.params;
    const { date, mealType, meal } = req.body;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const user = await User.findOne({ userId });
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const mealIndex = user.scheduledMeals.findIndex(
      (m) => (m as any)._id.toString() === mealId
    );

    if (mealIndex === -1) {
      res.status(404).json({ error: "Meal not found in calendar" });
      return;
    }

    // Update the meal properties
    if (date) user.scheduledMeals[mealIndex].date = new Date(date);
    if (mealType) user.scheduledMeals[mealIndex].mealType = mealType;
    if (meal) user.scheduledMeals[mealIndex].meal = meal;

    await user.save();

    res.status(200).json({
      message: "Calendar meal updated successfully",
      meal: user.scheduledMeals[mealIndex],
    });
  } catch (error) {
    console.error("Error updating calendar meal:", error);
    res.status(500).json({ error: "Failed to update calendar meal" });
  }
};

export const getMealsForWeek = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { startDate } = req.query;
    const userId = req.user?.userId;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!startDate) {
      res.status(400).json({ error: "Start date is required" });
      return;
    }

    const start = new Date(startDate as string);
    const end = new Date(start);
    end.setDate(end.getDate() + 7);

    // Get meals from in-memory storage
    const weekMeals =
      userMeals[userId]?.filter((day) => {
        const dayDate = new Date(day.date);
        return dayDate >= start && dayDate < end;
      }) || [];

    // Also try to get from database for more persistent storage
    try {
      const mealPlan = await MealPlan.findOne({ userId });
      if ((mealPlan as any)?.scheduledMeals) {
        const dbMeals = (mealPlan as any).scheduledMeals.filter((sm: any) => {
          const mealDate = new Date(sm.date);
          return mealDate >= start && mealDate < end;
        });

        // Merge database meals with in-memory meals
        dbMeals.forEach((dbMeal: any) => {
          const existingDay = weekMeals.find(
            (day) => day.date.toDateString() === dbMeal.date.toDateString()
          );

          if (existingDay) {
            (existingDay.meals as any)[dbMeal.mealType] = dbMeal.meal;
          } else {
            weekMeals.push({
              date: dbMeal.date,
              meals: { [dbMeal.mealType]: dbMeal.meal },
            });
          }
        });
      }
    } catch (dbError) {
      console.warn("Failed to fetch meals from database:", dbError);
      // Continue with in-memory data
    }

    // Sort by date
    weekMeals.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Calculate nutrition totals for the week
    const weeklyNutrition = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    weekMeals.forEach((day) => {
      Object.values(day.meals).forEach((meal: any) => {
        weeklyNutrition.calories += meal.calories || 0;
        weeklyNutrition.protein += meal.macros?.protein || 0;
        weeklyNutrition.carbs += meal.macros?.carbs || 0;
        weeklyNutrition.fat += meal.macros?.fat || 0;
      });
    });

    res.json({
      meals: weekMeals,
      weeklyNutrition,
      dateRange: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error getting meals for week:", error);
    res.status(500).json({ error: "Failed to get meals for week" });
  }
};
