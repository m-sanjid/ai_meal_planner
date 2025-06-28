import axios from "axios";
import { Meal } from "@/lib/constants";

export interface Favorite {
  _id: string;
  meal: Meal;
  userId?: string;
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

// Get favorite meals for a user
export const getFavoriteMeals = async (
  getToken: () => Promise<string | null>,
  userId: string,
): Promise<Favorite[]> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.get(
    `${API_BASE_URL}/api/meals/favorites/${userId}`,
    {
      headers,
    },
  );

  return response.data || [];
};

// Add a meal to favorites
export const addToFavorites = async (
  getToken: () => Promise<string | null>,
  userId: string,
  meal: Meal,
): Promise<Favorite> => {
  const headers = await getAuthHeaders(getToken);

  const response = await axios.post(
    `${API_BASE_URL}/api/meals/favorites`,
    { userId, meal },
    { headers },
  );

  return response.data;
};

// Remove a meal from favorites
export const removeFromFavorites = async (
  getToken: () => Promise<string | null>,
  favoriteId: string,
): Promise<void> => {
  const headers = await getAuthHeaders(getToken);

  await axios.delete(`${API_BASE_URL}/api/meals/favorites/${favoriteId}`, {
    headers,
  });
};
