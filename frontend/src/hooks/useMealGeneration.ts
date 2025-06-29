import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { generateMealPlan } from "@/lib/mealPlans";
import { mealPlanKeys } from "./useMealPlans";
import { Meal } from "@/components/MealCard";

// Helper functions for meal generation
const generateMockInstructions = () => [
  "Prepare all ingredients as specified",
  "Follow cooking instructions carefully",
  "Adjust seasoning to taste",
  "Serve hot and enjoy!",
];

const getRandomTime = () => {
  const times = ["15 min", "20 min", "25 min", "30 min", "35 min", "40 min"];
  return times[Math.floor(Math.random() * times.length)];
};

const getRandomDifficulty = () => {
  const difficulties = ["Easy", "Medium", "Hard"];
  return difficulties[Math.floor(Math.random() * difficulties.length)];
};

const generateRandomTags = () => {
  const allTags = [
    "Healthy",
    "Quick",
    "Vegetarian",
    "High Protein",
    "Low Carb",
    "Gluten Free",
  ];
  const numTags = Math.floor(Math.random() * 3) + 1;
  const shuffled = allTags.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, numTags);
};

// Hook to generate meal plan
export const useGenerateMealPlan = () => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: (data: {
      goal: string;
      dietaryPreferences: string;
      userId?: string;
      mealCount?: number;
      calorieTarget?: number;
      additionalNotes?: string;
      excludeIngredients?: string[];
      cookingTime?: string;
    }) => generateMealPlan(getToken, data),
    onSuccess: (data, variables) => {
      // Only invalidate queries if userId is provided (not demo)
      if (variables.userId) {
        queryClient.invalidateQueries({ queryKey: mealPlanKeys.list() });
        queryClient.invalidateQueries({
          queryKey: mealPlanKeys.user(variables.userId),
        });
      }

      // Process the meals to add mock data
      const processedMeals = data.meals.map((meal: Meal) => ({
        ...meal,
        id: `meal-${Math.random().toString(36).substr(2, 9)}`,
        instructions: meal.instructions || generateMockInstructions(),
        prepTime: meal.prepTime || getRandomTime(),
        cookTime: meal.cookTime || getRandomTime(),
        servings: meal.servings || Math.floor(Math.random() * 4) + 2,
        difficulty: meal.difficulty || getRandomDifficulty(),
        tags: meal.tags || generateRandomTags(),
        isFavorite: false,
      }));

      toast.success("Meal plan generated successfully!");

      return processedMeals;
    },
    onError: (error: any) => {
      console.error("Error generating meal plan:", error);
      const errorMessage =
        error.response?.data?.error || "Failed to generate meal plan";
      toast.error(errorMessage);
      throw error;
    },
  });
};
