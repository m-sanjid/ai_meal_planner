import axios from "axios";
import { Meal } from "@/components/MealCard";

export interface MealPlan {
  _id: string;
  userId: string;
  goal: string;
  meals: Meal[];
  totalNutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  createdAt: string;
  updatedAt: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth token
export const getAuthHeaders = async (
  getToken: () => Promise<string | null>,
) => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Get all meal plans for a user
export const getMealPlans = async (
  getToken: () => Promise<string | null>,
): Promise<MealPlan[]> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.get(`${API_BASE_URL}/api/meals/`, {
    headers,
  });

  return response.data || [];
};

// Get meal plans for a specific user
export const getUserMealPlans = async (
  getToken: () => Promise<string | null>,
  userId: string,
): Promise<MealPlan[]> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.get(`${API_BASE_URL}/api/meals/user/${userId}`, {
    headers,
  });

  return response.data || [];
};

// Generate a new meal plan
export const generateMealPlan = async (
  getToken: () => Promise<string | null>,
  data: {
    goal: string;
    dietaryPreferences: string;
    userId?: string;
    mealCount?: number;
    calorieTarget?: number;
    additionalNotes?: string;
    excludeIngredients?: string[];
    cookingTime?: string;
  },
): Promise<MealPlan> => {
  // For demo generations (no userId), don't send auth headers
  const headers = data.userId
    ? await getAuthHeaders(getToken)
    : {
        "Content-Type": "application/json",
      };

  const response = await axios.post(
    `${API_BASE_URL}/api/meals/generate`,
    data,
    { headers },
  );

  return response.data;
};

// Delete a meal plan
export const deleteMealPlan = async (
  getToken: () => Promise<string | null>,
  mealPlanId: string,
): Promise<void> => {
  const headers = await getAuthHeaders(getToken);

  await axios.delete(`${API_BASE_URL}/api/meals/${mealPlanId}`, {
    headers,
  });
};
