import { type Response } from "express";
import CalorieEntry from "../models/CalorieEntry";
import type { AuthenticatedRequest } from "../middlewares/authMiddleware";

export const getCalorieEntries = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { date } = req.query;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let query: any = { userId };

    // If date is provided, filter by that specific date
    if (date) {
      const targetDate = new Date(date as string);
      const startOfDay = new Date(targetDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(targetDate);
      endOfDay.setHours(23, 59, 59, 999);

      query.date = {
        $gte: startOfDay,
        $lte: endOfDay,
      };
    }

    const entries = await CalorieEntry.find(query).sort({ date: -1 });
    res.status(200).json(entries);
  } catch (error) {
    console.error("Error fetching calorie entries:", error);
    res.status(500).json({ error: "Failed to fetch calorie entries" });
  }
};

export const addMeal = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { name, calories, protein, carbs, fat, date } = req.body;

    if (!userId || !name || !calories) {
      res.status(400).json({
        error: "Missing required fields: userId, name, calories",
      });
      return;
    }

    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    // Find existing entry for the day or create new one
    let entry = await CalorieEntry.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (!entry) {
      entry = new CalorieEntry({
        userId,
        date: targetDate,
        meals: [],
        dailyGoal: 2000, // Default goal
      });
    }

    const newMeal = {
      id: Date.now().toString(),
      name: name.trim(),
      calories: parseFloat(calories) || 0,
      protein: parseFloat(protein) || 0,
      carbs: parseFloat(carbs) || 0,
      fat: parseFloat(fat) || 0,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    entry.meals.push(newMeal);
    await entry.save();

    res.status(201).json(entry);
  } catch (error) {
    console.error("Error adding meal:", error);
    res.status(500).json({ error: "Failed to add meal" });
  }
};

export const deleteMeal = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { entryId, mealId } = req.params;

    if (!userId || !entryId || !mealId) {
      res.status(400).json({
        error: "Missing required fields: entryId, mealId",
      });
      return;
    }

    const entry = await CalorieEntry.findOne({
      _id: entryId,
      userId,
    });

    if (!entry) {
      res.status(404).json({ error: "Entry not found" });
      return;
    }

    // Use pull to remove the meal from the array
    entry.meals.pull({ id: mealId });
    await entry.save();

    res.status(200).json(entry);
  } catch (error) {
    console.error("Error deleting meal:", error);
    res.status(500).json({ error: "Failed to delete meal" });
  }
};

export const updateDailyGoal = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { dailyGoal, date } = req.body;

    if (!userId || !dailyGoal) {
      res.status(400).json({
        error: "Missing required fields: userId, dailyGoal",
      });
      return;
    }

    const targetDate = date ? new Date(date) : new Date();
    const startOfDay = new Date(targetDate);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(targetDate);
    endOfDay.setHours(23, 59, 59, 999);

    let entry = await CalorieEntry.findOne({
      userId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (!entry) {
      entry = new CalorieEntry({
        userId,
        date: targetDate,
        meals: [],
        dailyGoal: parseFloat(dailyGoal),
      });
    } else {
      entry.dailyGoal = parseFloat(dailyGoal);
    }

    await entry.save();
    res.status(200).json(entry);
  } catch (error) {
    console.error("Error updating daily goal:", error);
    res.status(500).json({ error: "Failed to update daily goal" });
  }
};

export const getNutritionSummary = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const { startDate, endDate } = req.query;

    if (!userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    let dateFilter: any = {};

    if (startDate && endDate) {
      dateFilter = {
        date: {
          $gte: new Date(startDate as string),
          $lte: new Date(endDate as string),
        },
      };
    }

    const entries = await CalorieEntry.find({ userId, ...dateFilter });

    const summary = entries.reduce(
      (acc, entry) => {
        entry.meals.forEach((meal) => {
          acc.totalCalories += meal.calories || 0;
          acc.totalProtein += meal.protein || 0;
          acc.totalCarbs += meal.carbs || 0;
          acc.totalFat += meal.fat || 0;
        });
        return acc;
      },
      { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 }
    );

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error fetching nutrition summary:", error);
    res.status(500).json({ error: "Failed to fetch nutrition summary" });
  }
};
