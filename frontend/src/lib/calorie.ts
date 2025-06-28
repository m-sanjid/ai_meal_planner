import axios from "axios";

export interface CalorieMeal {
  id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
}

export interface CalorieEntry {
  _id: string;
  userId: string;
  date: string;
  meals: CalorieMeal[];
  dailyGoal: number;
  createdAt: string;
  updatedAt: string;
}

export interface NutritionSummary {
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
}

export interface AddMealData {
  name: string;
  calories: string | number;
  protein?: string | number;
  carbs?: string | number;
  fat?: string | number;
  date?: string;
}

export interface UpdateDailyGoalData {
  dailyGoal: number;
  date?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL;

// Helper function to get auth token - this will be called from hooks
export const getAuthHeaders = async (
  getToken: () => Promise<string | null>,
) => {
  const token = await getToken();
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// Get calorie entries for a user
export const getCalorieEntries = async (
  getToken: () => Promise<string | null>,
  date?: string,
): Promise<CalorieEntry[]> => {
  const headers = await getAuthHeaders(getToken);
  const params = date ? { date } : {};

  const response = await axios.get(`${API_BASE_URL}/api/calorie/entries`, {
    headers,
    params,
  });

  return response.data;
};

// Add a new meal
export const addMeal = async (
  getToken: () => Promise<string | null>,
  mealData: AddMealData,
): Promise<CalorieEntry> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.post(
    `${API_BASE_URL}/api/calorie/meals`,
    mealData,
    {
      headers,
    },
  );

  return response.data;
};

// Delete a meal
export const deleteMeal = async (
  getToken: () => Promise<string | null>,
  entryId: string,
  mealId: string,
): Promise<CalorieEntry> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.delete(
    `${API_BASE_URL}/api/calorie/entries/${entryId}/meals/${mealId}`,
    { headers },
  );

  return response.data;
};

// Update daily goal
export const updateDailyGoal = async (
  getToken: () => Promise<string | null>,
  goalData: UpdateDailyGoalData,
): Promise<CalorieEntry> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.put(
    `${API_BASE_URL}/api/calorie/daily-goal`,
    goalData,
    {
      headers,
    },
  );

  return response.data;
};

// Get nutrition summary
export const getNutritionSummary = async (
  getToken: () => Promise<string | null>,
  startDate?: string,
  endDate?: string,
): Promise<NutritionSummary> => {
  const headers = await getAuthHeaders(getToken);
  const params: any = {};

  if (startDate) params.startDate = startDate;
  if (endDate) params.endDate = endDate;

  const response = await axios.get(`${API_BASE_URL}/api/calorie/summary`, {
    headers,
    params,
  });

  return response.data;
};
